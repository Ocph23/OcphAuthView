import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss','../auth.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: any;
  Roles: string[];


  constructor(private auth:AuthService, private router:Router, private helper:HelperService) { 
    this.Roles = this.helper.getRoles();
  }

  ngOnInit() {
    
    this.auth.me().then(x=>{
      this.profile=x;
      this.profile.fullName=x.firstName+" "+x.lastName;
      this.profile.role=x.roles[0];
    },err=>{
      alert(err);
      this.router.navigate(['/login']);

    });


  }

  ChangeIdentityLabel(role ){
    var selected = this.profile.role;
    if(selected===role)
     return true;

  }

  updateProfile(profile)
  {
    this.auth.updateProfile(profile).then(x=>{
      this.profile=x;
      this.profile.fullName=x.firstName+" "+x.lastName;
      this.profile.role=x.roles[0];
    },err=>{
      alert(err);
    });

  }


}
