import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  currentUser: User = null;
  http : HttpClient;
  newUser: User = new User();
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
   http: HttpClient
  ) {
    this.http = http;
  }


  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home/one';

    this.form = this.fb.group({
      email: ['', Validators.email],
      username: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      name: ['', Validators.required],
      lastname:  ['', Validators.required],
      bankaccount: ['', Validators.required],
      walletadress: ['', Validators.required]
    });

    if (localStorage.getItem("username") !== null) {

      await this.router.navigate([this.returnUrl]);
    }
  }
  


  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
        this.newUser.Email = this.form.get('email').value;
        this.newUser.UserName = this.form.get('username').value;
        this.newUser.Password = this.form.get('password').value;
        const password2 = this.form.get('password2').value;
        this.newUser.Name = this.form.get('name').value;
        this.newUser.SurName = this.form.get('lastname').value;
        this.newUser.BankAccountNumber = this.form.get('bankaccount').value;
        this.newUser.WalletAdress = this.form.get('walletadress').value;
        const options = {
          headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
        };
        
        this.http.post<User>('https://localhost:5001/user/createuser', JSON.stringify(this.newUser), options).subscribe(result => {
       console.log(result);  
     this.currentUser = result;

     if (this.currentUser !== null){
      localStorage.setItem("username", this.currentUser.UserName);
      this.router.navigate([this.returnUrl]);
    }
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

