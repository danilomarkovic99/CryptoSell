import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.scss']
})
export class AddAdComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  currentUser: User = null;
  http : HttpClient;
  coins: Coin[] = null;
  types: Type[] = [{Name: "Kupovina", Value: 0}, {Name:"Prodaja", Value:1}];
  ad: Ad = new Ad();
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
   http: HttpClient
  ) {
    this.http = http;
    http.get<Coin[]>('https://localhost:5001/' + 'coin/getcoins').subscribe(result => {
      this.coins = result;
    }, error => console.error(error));


  }

  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home/profile';

    this.form = this.fb.group({
      coin: ['', Validators.required],
      type: ['', Validators.required],
      amount: ['', Validators.required],
      price: ['', Validators.required]   
    });

    if (localStorage.getItem("username") !== null) {
      await this.router.navigate([this.returnUrl]);
    }
  }


  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
        this.ad.Coin.Symbol = this.form.get('coin').value;
        this.ad.AdType = this.form.get('type').value;
        this.ad.CryptoCurrencyAmount = this.form.get('amount').value;
        this.ad.Price = this.form.get('price').value;
        this.ad.Advertiser = this.currentUser;
        const options = {
          headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
        };
        
      this.http.post<Ad>('https://localhost:5001/ad/createad', JSON.stringify(this.ad), options).subscribe(result => {
      console.log(result);  
    }, error =>  console.log(error));
    } 
    
  }
}

class User{
  Id: string;
  UserName: string;
  Name: string;
  SurName: string;
  Email: string;
  Password: string;
  Role: number;
  WalletAdress: string;
  BankAccountNumber: string;
}

class Coin {
  Symbol: string;
  Name: string;
  MarketPrice: number;
}

interface Type {
  Name: string;
  Value: number;
}

class Ad {
  AdUid: string;
  Coin: Coin;
  CryptoCurrencyAmount: number;
  Price: number;
  Advertiser: User;
  AdType: number;
  AdStatus: number;
  TransactionNumber: number;
  add: Coin[];
}
