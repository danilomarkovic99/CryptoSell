import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { t } from '@angular/core/src/render3';

@Component({
  selector: 'app-coinprice',
  templateUrl: './coinprice.component.html',
  styleUrls: ['./coinprice.component.scss']
})
export class CoinpriceComponent implements AfterViewInit {
  displayedColumns:  string[] = ['symbol', 'name', 'marketPrice'];
  httpClient: HttpClient;
  public coins: Coin[] = [];
  dataSource = new MatTableDataSource<Coin>(this.coins);

  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  constructor(http: HttpClient) {
    http.get<Coin[]>('https://localhost:5001/' + 'coin/getcoins').subscribe(result => {
      this.dataSource = new MatTableDataSource<Coin>(result);
      this.ngAfterViewInit();
    }, error => console.error(error));
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}

interface Coin {
  Symbol: string;
  Name: string;
  MarketPrice: number;
}

