import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginModel } from 'src/app/models/login-model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss','../auth.component.scss']
})

export class LoginComponent implements OnInit {

model:any;
  constructor(private auth:AuthService, private fb:FormBuilder, private http:HttpClient, private router:Router) { 

    if(auth.userLoged())
        this.router.navigate(["/profile"]);

  this.model=  this.fb.group({
      'userName':[''],
      'password':['']
    })
  }
  
  ngOnInit() {
   
  }


  async login(model)
  {
      this.auth.login(model).then(x=>{
        this.router.navigate(['/profile'])

      },err=>{
        alert(err);

      });
  }



}
