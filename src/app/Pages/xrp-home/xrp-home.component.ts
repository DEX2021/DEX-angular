import { Component, OnInit } from '@angular/core';
const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
  server: 'wss://s1.ripple.com'
})

@Component({
  selector: 'app-xrp-home',
  templateUrl: './xrp-home.component.html',
  styleUrls: ['./xrp-home.component.scss']
})
export class XrpHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.connectXrpl();
  }


  connectXrpl() {
    api.connect().then(() => {
      const myAddress = 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn';

      console.log('getting account info for', myAddress);
      return api.getAccountInfo(myAddress);
    }).then(info => {
      console.log(info);

      console.log("account info done");


    }).then(() => {
      return api.disconnect();
    }).then(() => {
      console.log('done and disconnected.');
    }).catch(console.error);
  }
}
