import { Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js'
import { chartOptions, dummyData } from './PriceChart.config'
import { Store, select } from '@ngrx/store'
import { AppState, IOrder } from '../../../models/models'
import { appInitSelector, priceChartSelector, lastPriceSelector } from '../../../Store/selectors'
import { Observable } from 'rxjs';
import { createChart, IChartApi, isBusinessDay, ISeriesApi, TickMarkType } from 'lightweight-charts';
import { get, reject, groupBy, maxBy, minBy } from 'lodash'
import moment from 'moment';

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

  private chart: any = null;

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

  regroupData(series) {
    let groupedSeries = groupBy(series, (s) => moment.unix(s.x).startOf('day').format())
    let hours = Object.keys(groupedSeries)

    let graphData = hours.map(hour => {
      const group = groupedSeries[hour]

      let open, high, low, close

      if (group.length < 2) {
        open = group[0].y[0]
        high = group[0].y[1]
        low = group[0].y[2]
        close = group[0].y[3]
      } else {
        open = group[group.length - 1].y[0]
        high = group[group.length - 1].y[1]
        low = group[group.length - 1].y[2]
        close = group[group.length - 1].y[3]
      }

      return {
        x: new Date(group[0].x),
        y: [open, high, low, close]
      }
    })

    return graphData
  }

  ngOnInit(): void {
    this.$priceChartData.subscribe(data => {
      
      // Combine dummy data and new series
      var series = this.options.series[0].data

      console.log("Old series", series)
      console.log("Old options", this.options)

      data.series.forEach(item => {
        item.data.forEach(serie => {
          series.push(serie)
        })
      })

      // Regroup data
      series = this.regroupData(series)
      // this.options = {
      //   ...this.options,
      //   series: {
      //     ...series
      //   }
      // }


      this.lastPriceChange = data.lastPriceChange
      this.options = {
        ...this.options,
        // ...data
      }

      console.log("Price", this.options.series)

      let chartDiv = document.querySelector("#chart")
      if (this.chart === null) {
        this.chart = new ApexCharts(chartDiv, this.options);
        this.chart.render()
      } else {
        this.chart.updateOptions(this.options)
        // this.chart.updateSeries(series)
      }
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
