import { Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js'
import { chartOptions, dummyData } from './PriceChart.config'

@Component({
  selector: '[app-price-chart]',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.scss']
})
export class PriceChartComponent implements OnInit {

  options2 = {
    chart: {
      type: 'candlestick',
    },
    series: [dummyData],
    options: { chartOptions }
  }

  options = {
    chart: {
      type: 'bar'
    },
    series: [{
      name: 'sales',
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125]
    }],
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
  }

  constructor() { }

  ngOnInit(): void {
    var chart = new ApexCharts(document.querySelector("#chart"), this.options2);

    chart.render()
  }

}
