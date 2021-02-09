import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTab, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements AfterViewInit {
  public ads: Ad[] = [];
  public procads: Ad[] = [];
  dataSource = new MatTableDataSource<Ad>(this.ads);
  dataSource2 = new MatTableDataSource<Ad>(this.procads);
  displayedColumns:  string[] = ['Coin', 'Kolicina', 'Cena', 'Tip', 'Obrisi'];
  displayedColumns2:  string[] = ['Coin', 'Kolicina', 'Cena', 'Oglasivac', 'Obustavi'];
  httpClient: HttpClient;
  currentUser: User = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(http: HttpClient) {

    http.get<User>('https://localhost:5001/' + 'user/getuser?username=' + localStorage.getItem("username")).subscribe(result => {
      this.currentUser = result;
    }, error => console.error(error));
    this.httpClient = http; 
    this.ngAfterViewInit();

    http.get<Ad[]>('https://localhost:5001/' + 'ad/getuseractiveads?username=' + localStorage.getItem("username")).subscribe(result => {
      console.log(result);
      this.ads = result;
      this.dataSource = new MatTableDataSource<Ad>(result);
      this.ngAfterViewInit();
    }); 

    http.get<Ad[]>('https://localhost:5001/' + 'ad/getuserprocessingads?username=' + localStorage.getItem("username")).subscribe(result => {
      console.log(result);
      this.dataSource2 = new MatTableDataSource<Ad>(result);
      this.ngAfterViewInit();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}

export enum AdType{
  Buy = 0,
  Sell = 1
}

export enum AdStatus{
  Active = 0,
  Processing = 1,
  Done = 2,
  Archived = 3
}

class Ad {
  AdUid: string;
  Coin: Coin;
  CryptoCurrencyAmount: number;
  Price: number;
  Advertiser: User;
  adType: AdType;
  adStatus: AdStatus;
  TransactionNumber: number;
}

class Coin {
  Symbol: string;
  Name: string;
  MarketPrice: number;
}

class User {
  UserName: string;
  Name: string;
  SurName: string;
  Email: string;
  Password: string;
  Role: number;
  WalletAdress: string;
  BankAccountNumber: string;
}