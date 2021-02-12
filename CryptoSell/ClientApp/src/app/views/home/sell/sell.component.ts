import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements AfterViewInit {
  displayedColumns:  string[] = ['Coin', 'Kolicina', 'Cena', 'Kupac', 'Prodaj'];
  httpClient: HttpClient;
  public ads: Ad[] = [];
  dataSource = new MatTableDataSource<Ad>(this.ads);

  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  constructor(http: HttpClient) {
    http.get<Ad[]>('https://localhost:5001/' + 'ad/getadssell').subscribe(result => {
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
     .subscribe(s => {
      console.log(s);
      const pr = parseFloat(ad.price) * 86;
      alert("Uplatite na racun 170-12054555-12 u iznosu " + pr + " dinara");
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
