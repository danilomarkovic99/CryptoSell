import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractFormGroupDirective } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements AfterViewInit {
  displayedColumns:  string[] = ['coin', 'kolicina', 'cena', 'prodavac', 'Kupi'];

  httpClient: HttpClient;
  public ads: Ad[] = [];

  dataSource = new MatTableDataSource<Ad>(this.ads);

  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  constructor(http: HttpClient) {
    http.get<Ad[]>('https://localhost:5001/' + 'ad/getadsbuy').subscribe(result => {
      this.dataSource = new MatTableDataSource<Ad>(result);
      this.ngAfterViewInit();
    }, error => console.error(error));
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}


interface Ad {
  AdUid: string;
  Coin: Coin;
  CryptoCurrencyAmount: number;
  Price: number;
  Advertiser: User;
  AdType: number;
  AdStatus: number;
  TransactionNumber: number;
}

interface Coin {
  Symbol: string;
  Name: string;
  MarketPrice: number;
}

interface User {
  UserName: string;
  Name: string;
  SurName: string;
  Email: string;
  Password: string;
  Role: number;
  WalletAdress: string;
  BankAccountNumber: string;
}