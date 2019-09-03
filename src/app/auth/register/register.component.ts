import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { LoginModel } from "src/app/models/login-model";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn
} from "@angular/forms";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HelperService } from "src/app/services/helper.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss", "../auth.component.scss"]
})
export class RegisterComponent implements OnInit {
  model: FormGroup;
  Roles: string[];
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private helper: HelperService,
    private route: Router,
  ) {
    this.model = this.fb.group(
      {
        password: ["", [Validators.required, Validators.minLength(6)]],
        role: ["Guest", Validators.required],
        firstName: ["", Validators.required],
        lastName: [""],
        identityNumber: [""],
        email: ["", [Validators.required, Validators.email]],
        confirmPassword: ["", Validators.pattern]
      },
      { validators:[equalValueValidator("password", "confirmPassword")] }
    );
  }

  ngOnInit() {
    this.Roles = this.helper.getRoles();
  }

  register(model: any) {
    if (this.model.valid) {
      this.auth.register(model).then(x=>{
        this.route.navigate(['/profile']);
      },err=>{
        alert(err);

      });
    }else{
      alert("Lengkapi Data Anda");
    }
  }


  ChangeIdentityLabel(role){
    var selected = this.model.value.role;
    if(selected===role)
     return true;

  }

}

export function equalValueValidator(
  targetKey: string,
  toMatchKey: string
): ValidatorFn {
  return (group: FormGroup): { [key: string]: any } => {
    const target = group.controls[targetKey];
    const toMatch = group.controls[toMatchKey];
    if (target.touched && toMatch.touched) {
      const isMatch = target.value === toMatch.value;
      // set equal value error on dirty controls
      if (!isMatch && target.valid && toMatch.valid) {
        toMatch.setErrors({ equalValue: targetKey });
        const message = targetKey + " != " + toMatchKey;
        return { equalValue: message };
      }
      if (isMatch && toMatch.hasError("equalValue")) {
        toMatch.setErrors(null);
      }
    }

    return null;
  };
}
