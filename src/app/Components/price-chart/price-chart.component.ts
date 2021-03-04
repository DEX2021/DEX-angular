import { Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js'
import { chartOptions, dummyData } from './PriceChart.config'
import { Store, select } from '@ngrx/store'
import { AppState, IOrder } from '../../../models/models'
import { priceChartSelector } from '../../../Store/selectors'
import { Observable } from 'rxjs';

@Component({
  selector: '[app-price-chart]',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.scss']
})
export class PriceChartComponent implements OnInit {
  lastPriceChange: number = 0.00000
  lastPrice: number = 0.00000
  $priceChartData: Observable<any>

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

    this.$priceChartData.subscribe(data => {
      this.lastPrice = data.lastPrice
      this.lastPriceChange = data.lastPriceChange
      this.options = {
        ...this.options,
        ...data
      }
      var chart = new ApexCharts(document.querySelector("#chart"), this.options);
      chart.render()
    })
  }

  ngOnInit() : void {
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
