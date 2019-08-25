import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 async login(model: any) {
    return true;
  }

  constructor() { }
}
