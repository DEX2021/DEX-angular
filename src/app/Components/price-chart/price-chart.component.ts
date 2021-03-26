import { Component, OnInit, AfterViewInit } from '@angular/core';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js'
import { chartOptions, dummyData } from './PriceChart.config'
import { Store, select } from '@ngrx/store'
import { AppState, IOrder } from '../../../models/models'
import { priceChartSelector } from '../../../Store/selectors'
import { Observable } from 'rxjs';
import { createChart, IChartApi, isBusinessDay, ISeriesApi, TickMarkType } from 'lightweight-charts';

@Component({
  selector: '[app-price-chart]',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.scss']
})
export class PriceChartComponent implements OnInit, AfterViewInit {
  lastPriceChange: number = 0.00000
  lastPrice: number = 0.00000
  $priceChartData: Observable<any>
  chart: IChartApi
  series: ISeriesApi<"Candlestick">

  options = {
    chart: {
      type: 'candlestick',
    },
    series: [...dummyData],
    //options: { chartOptions }
    ...chartOptions
  }

  constructor(private store: Store<AppState>) {
    this.$priceChartData = store.pipe(select(priceChartSelector))

    // this.$priceChartData.subscribe(data => {
    //   this.lastPrice = data.lastPrice
    //   this.lastPriceChange = data.lastPriceChange
    //   this.options = {
    //     ...this.options,
    //     ...data
    //   }
    //   var chart = new ApexCharts(document.querySelector("#chart"), this.options);
    //   chart.render()
    // })
  }

  ngAfterViewInit() : void {
    console.log("AFTER VIEW INIT")
  }

  ngOnInit() : void {
    let chart_dom = document.getElementById("chart")
    this.chart = createChart(chart_dom, {
      height: 450,
      timeScale: {
        timeVisible: false
      }
    });
    this.series = this.chart.addCandlestickSeries({
      priceFormat: {
        type: 'custom',
        formatter: (price) => {
          return 'DEX/ETH ' + parseFloat(price).toFixed(5)
        }
      }
    });

    this.$priceChartData.subscribe(data => {
      this.lastPrice = data.lastPrice
      this.lastPriceChange = data.lastPriceChange

      this.series.setData(data.series)
      console.log(data.series)
      // this.chart.timeScale().resetTimeScale()
      this.chart.timeScale().fitContent()
    })
  }

  priceSymbol(priceChange) {
    let output
    if (priceChange === '+') {
      output = "<span class=\"text-success\">&#9650;</span>"
    } else {
      output = "<span class=\"text-danger\">&#9660;</span>"
    }

    return output;
  }
}
