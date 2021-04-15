import { Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js'
import { chartOptions, dummyData } from './PriceChart.config'
import { Store, select } from '@ngrx/store'
import { AppState, IOrder } from '../../../models/models'
import { appInitSelector, priceChartSelector, lastPriceSelector } from '../../../Store/selectors'
import { Observable } from 'rxjs';
import { createChart, IChartApi, isBusinessDay, ISeriesApi, TickMarkType } from 'lightweight-charts';

@Component({
  selector: '[app-price-chart]',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.scss']
})
export class PriceChartComponent implements OnInit {
  lastPriceChange: number = 0.00000
  // lastPrice: number = 0.00000
  $priceChartData: Observable<any>
  $lastPrice: Observable<number>
  $appInit: Observable<boolean>

  options = {
    chart: {
      height: 450,
      type: 'candlestick',
    },
    series: [...dummyData],
    //options: { chartOptions }
    ...chartOptions
  }

  options2 = {
    series: [{
      name: 'candle',
      data: []
    }],
    chart: {
      height: 450,
      type: 'candlestick',
    },
    title: {
      text: 'CandleStick Chart - Category X-axis',
      align: 'left'
    },
    annotations: {
      xaxis: [
        {
          x: 'Oct 06 14:00',
          borderColor: '#00E396',
          label: {
            borderColor: '#00E396',
            style: {
              fontSize: '12px',
              color: '#fff',
              background: '#00E396'
            },
            orientation: 'horizontal',
            offsetY: 7,
            text: 'Annotation Test'
          }
        }
      ]
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: 'category',
      labels: {
        formatter: (price) => {
          return 'DEX/ETH ' + parseFloat(price).toFixed(5)
        }
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };

  constructor(private store: Store<AppState>) {
    this.$priceChartData = store.pipe(select(priceChartSelector))
    this.$lastPrice = store.pipe(select(lastPriceSelector))
    this.$appInit = store.pipe(select(appInitSelector))
  }

  ngOnInit(): void {
    this.$priceChartData.subscribe(data => {
      this.lastPriceChange = data.lastPriceChange
      this.options = {
        ...this.options,
        ...data
      }

      var chart = new ApexCharts(document.querySelector("#chart"), this.options);
      chart.render()
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
