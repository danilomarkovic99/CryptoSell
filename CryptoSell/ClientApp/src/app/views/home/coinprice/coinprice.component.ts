import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coinprice',
  templateUrl: './coinprice.component.html',
  styleUrls: ['./coinprice.component.scss']
})
export class CoinpriceComponent implements OnInit {
  displayedColumns:  string[] = ['Symbol', 'Name', 'Price'];

  constructor() { }

  ngOnInit() {
  }

}
