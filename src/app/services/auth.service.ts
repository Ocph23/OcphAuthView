import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, defer } from "rxjs";
import { HelperService } from "./helper.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  

  constructor(private http: HttpClient, private helper: HelperService) {}

  async me() {
    try {
      if (this.userLoged() &&  this.helper.storage.getObject("user")) 
        return this.helper.storage.getObject("user");
      else {
        var result = await this.http
          .get<any>(this.helper.url("/auth/me"), this.getHttpHeader())
          .toPromise();
        this.helper.storage.addObject("user", result);
        return result;
      }
    } catch (err) {
      throw new Error(err.error.message);
    }
  }
  async registerAsDeveloper() {
    try {
      var result = await this.http
        .get<any>(this.helper.url("/register/developer"), this.getHttpHeader())
        .toPromise();
      this.helper.storage.remove("user");
      this.helper.storage.addObject("user", result);
      return result;
    } catch (err) {
      throw new Error(err.error.message);
    }
  }

  async updateProfile(model) {
    try {
      var result = await this.http
        .put<any>(this.helper.url("/auth/profile"), model, this.getHttpHeader())
        .toPromise();

      return result;
    } catch (err) {
      throw new Error(err.error.message);
    }
  }

  async register(model: any) {
    try {
      var result = await this.http
        .post<any>(
          this.helper.url("/register/create"),
          model,
          this.getHttpHeader()
        )
        .toPromise();
      return result;
    } catch (err) {
      throw new Error(err.error.message);
    }
  }

  async login(model: any) {
    try {
      var result = await this.http
        .post<any>(this.helper.url("/auth/login"), model, this.getHttpHeader())
        .toPromise();
      this.helper.storage.addObject("token", result);
      return result;
    } catch (err) {
      throw new Error(err.error.message);
    }
  }

  private getToken(): string {
    const userData = this.helper.storage.getObject("token");
    if (userData != null) {
      const token = userData.access_token;
      return token;
    } else {
      return null;
    }
  }

  public getHttpHeader() {
    try {
      const token = this.getToken();
      if (token) {
        const httpOptions = {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          })
        };
        return httpOptions;
      } else {
        const httpOptions = {
          headers: new HttpHeaders({
            "Content-Type": "application/json"
          })
        };
        return httpOptions;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  //helper

  userLoged(): Boolean {
    const userData = this.helper.storage.getObject("token");
    if (userData) {
      return true;
    }
    return false;
  }

  userInRole(role: string): boolean {
    try {
      const userData = this.helper.storage.getObject("user");
      if (userData && userData.user.roles) {
        var roles = userData.user.roles as [];
        if (roles.find(x => x === role)) return true;
      }
      return false;
    } catch {
      return false;
    }
  }
}

///helper

//Helper+
