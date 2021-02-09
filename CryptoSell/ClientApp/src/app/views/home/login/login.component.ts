import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  currentUser: any = null;
  http : HttpClient;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
   http: HttpClient
  ) {
    this.http = http;
  }


  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home/profile';

    this.form = this.fb.group({
      username: [''],
      password: ['', Validators.required]
    });

    if (localStorage.getItem("username") !== null) {

      await this.router.navigate([this.returnUrl]);
    }
  }
  


  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        this.http.get<User>('https://localhost:5001/' + 'user/login?username=' + username +'&password=' + password).subscribe(result => {
       console.log(result);  
     this.currentUser = result;

     if (this.currentUser !== null){
      localStorage.setItem("username", username);
      this.router.navigate([this.returnUrl]);
    }
    }, error =>  alert("Niste pogodili sifru ili lozinku"));
    } 
    
  }
}

interface User {
  username: string;
  password: string;
}

