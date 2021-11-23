import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // tslint:disable-next-line:variable-name
  private _registerUrl = 'http://localhost:4002/api/notes/register';
  // tslint:disable-next-line:variable-name
  private _loginUrl = 'http://localhost:4002/api/auth/login';


  constructor(
    public http: HttpClient,
    public router: Router
  ) {}

  // tslint:disable-next-line:typedef
  async registerUser(user: any){
      // return this.http.post<any>(this._registerUrl, user);
      const fetchParams = { method : 'POST',
      body : JSON.stringify(user),
      headers : {'Content-Type'  : 'application/json'}
      };
        // let resp = await fetch("http://localhost:8000/api/auth/login", fetchParams);
      const resp = await fetch(this._registerUrl, fetchParams);
      const data = await resp.json();
        // console.log('data-' +  JSON.stringify(data))
        // console.log('data.token - ' + data.token)
      return data;
  }

  // tslint:disable-next-line:typedef
  async loginUser(user: any){
    // return this.http.post<any>(this._loginUrl, user);
    const fetchParams = { method : 'POST',
    body : JSON.stringify(user),
    headers : {'Content-Type'  : 'application/json'}
   };
      // let resp = await fetch("http://localhost:8000/api/auth/login", fetchParams);
    const resp = await fetch(this._loginUrl, fetchParams);
    const data = await resp.json();
      // console.log('data-' +  JSON.stringify(data))
      // console.log('data.token - ' + data.token)
    return data;
  }

  saveToken(tokenData: any)
  {
    sessionStorage.token = tokenData.token;
    sessionStorage.role = tokenData.role;
  }

  // tslint:disable-next-line:typedef
  loggedIn(){
    return !!sessionStorage.getItem('token');
  }

  // tslint:disable-next-line:typedef
  getToken(){
    return sessionStorage.getItem('token');
  }

  // tslint:disable-next-line:typedef
  logOutUser(){
    return sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
