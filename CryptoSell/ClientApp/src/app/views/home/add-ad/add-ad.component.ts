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
        
        
        const password2 = this.form.get('password2').value;
       
        const options = {
          headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
        };
        
      this.http.post<User>('https://localhost:5001/user/createuser', JSON.stringify(this.currentUser), options).subscribe(result => {
      console.log(result);  
      this.currentUser = result;     
    }, error =>  alert("Postoji user sa datim usernameom ili emailom"));
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

interface Coin {
  Symbol: string;
  Name: string;
  MarketPrice: number;
}

interface Type {
  Name: string;
  Value: number;

}