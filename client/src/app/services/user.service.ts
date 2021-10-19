import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // tslint:disable-next-line:variable-name
  private _userUrl = 'http://localhost:3000/api/user';

  constructor(
    private http: HttpClient
  ) { }

  // tslint:disable-next-line:typedef
  getUser(){
    return this.http.get<any>(this._userUrl);
  }
}
