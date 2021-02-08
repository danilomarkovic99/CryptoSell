import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {
  displayedColumns:  string[] = ['Coin', 'Kolicina', 'Cena', 'Kupac', 'Prodaj'];

  constructor() { }

  ngOnInit() {
  }

}
