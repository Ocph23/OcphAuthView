import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss','../auth.component.scss']
})

export class LoginComponent implements OnInit {
  constructor(private auth:AuthService) { 
  
  }
  
  ngOnInit() {
   
  }


  login(model)
  {
    this.auth.login(model).then(x=>{
      if(x==true)
      {
        alert("OK");
      }
    });
  }



}
