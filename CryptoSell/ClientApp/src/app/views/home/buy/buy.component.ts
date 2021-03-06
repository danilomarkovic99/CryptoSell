import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  add : any = null;
  dataSource = new MatTableDataSource<Ad>(this.ads);

  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  constructor(http: HttpClient) {
    http.get<Ad[]>('https://localhost:5001/' + 'ad/getadsbuy').subscribe(result => {
      this.dataSource = new MatTableDataSource<Ad>(result);
      this.ngAfterViewInit();
    }, error => console.error(error));
    this.httpClient = http;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public buyCoin(ad, event){
    const options = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
    };
  this.httpClient.put('https://localhost:5001/' + 'ad/buycoin', JSON.stringify(ad), options)
     .subscribe((s) => {
      console.log(s);
      alert("Prebacite kriptosredstva na 0x718d3B215993fF4dd6bAa6CE322430B82DCCd7F9 u iznosu od " + ad.cryptoCurrencyAmount + " " + ad.coin.name + " da bi izvrsili zeljenu prodaju");
      location.reload();
    });
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