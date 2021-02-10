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
  private returnUrl: string;
  currentUser: User = new User();
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
      amount: ['', Validators.required],
      price: ['', Validators.required]   
    });

  
  
  }

  selected(event) {
   
    this.ad.AdType = parseInt(event.value);
  }
  selected1(event) {  
    this.ad.Symbol = event.value;
    
  }

  async onSubmit() {
    
    if (this.form.valid) { 
        this.ad.Amount = parseFloat(this.form.get('amount').value);
        this.ad.Price = parseFloat(this.form.get('price').value);
        this.ad.Advertiser = localStorage.getItem("username");
        const options = {
          headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
        };
        

      this.http.post<Ad>('https://localhost:5001/ad/createad', JSON.stringify(this.ad), options).subscribe(result => {
      console.log(result);  
    }, error =>  console.log(error));
    this.router.navigate([this.returnUrl]);
    } 
    
  }
}

class User{
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
  Id: Object;
  Symbol: string;
  Name: string;
  MarketPrice: number;
}

interface Type {
  Name: string;
  Value: number;
}

class Ad {
  
  Symbol: string;
  Price: number;
  Advertiser: string;
  AdType: number;
  Amount: number;
}

