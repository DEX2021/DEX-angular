import { Component, OnInit, AfterViewInit } from '@angular/core';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js'
import { chartOptions, dummyData } from './PriceChart.config'
import { Store, select } from '@ngrx/store'
import { AppState, IOrder } from '../../../models/models'
import { priceChartSelector } from '../../../Store/selectors'
import { Observable } from 'rxjs';
import { createChart, IChartApi, ISeriesApi } from 'lightweight-charts';

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

    // let dom_element = document.querySelector("#chart");

    // const chart = createChart("chart", { width: 400, height: 300 });
    // const lineSeries = chart.addLineSeries();
    // lineSeries.setData([
    //   { time: '2019-04-11', value: 80.01 },
    //   { time: '2019-04-12', value: 96.63 },
    //   { time: '2019-04-13', value: 76.64 },
    //   { time: '2019-04-14', value: 81.89 },
    //   { time: '2019-04-15', value: 74.43 },
    //   { time: '2019-04-16', value: 80.01 },
    //   { time: '2019-04-17', value: 96.63 },
    //   { time: '2019-04-18', value: 76.64 },
    //   { time: '2019-04-19', value: 81.89 },
    //   { time: '2019-04-20', value: 74.43 },
    // ])

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
    this.chart = createChart(chart_dom, { height: 450, handleScale: true, handleScroll: true });
    this.series = this.chart.addCandlestickSeries();

    this.$priceChartData.subscribe(data => {
      this.lastPrice = data.lastPrice
      this.lastPriceChange = data.lastPriceChange

      this.series.setData(data.series)
    })
    // const lineSeries = chart.addLineSeries();
    // lineSeries.setData([
    //   { time: '2019-04-11', value: 80.01 },
    //   { time: '2019-04-12', value: 96.63 },
    //   { time: '2019-04-13', value: 76.64 },
    //   { time: '2019-04-14', value: 81.89 },
    //   { time: '2019-04-15', value: 74.43 },
    //   { time: '2019-04-16', value: 80.01 },
    //   { time: '2019-04-17', value: 96.63 },
    //   { time: '2019-04-18', value: 76.64 },
    //   { time: '2019-04-19', value: 81.89 },
    //   { time: '2019-04-20', value: 74.43 },
    // ])
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
