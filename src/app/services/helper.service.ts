import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }


  getRoles():string[]{
    return ["Guest","Student","Teacher","Staff","Developer"];
  }


}
