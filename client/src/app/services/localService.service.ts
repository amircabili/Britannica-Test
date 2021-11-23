import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { interval, Observable , Subject} from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  public globalData: Observable<any>;
  // sub: Subject<any>

  // tslint:disable-next-line:variable-name
  private _userUrl = 'http://localhost:4002/api/notes/';

  constructor(
    private http: HttpClient
  ) {


    this.globalData = new Observable(observer => {
      const obj: any[] = [];

            // this.http.get<any>(this._userUrl,{headers : header})
            // .subscribe(resp=>{
            //       obj = resp
            //       observer.next(obj);
            // })

      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzU3MDU1NzQsImV4cCI6MTYzNTcxMjc3NH0.3IaxgiTsZyKX2ujRnIadlabFI9N2ULkgd1Kfjs-p9Sc';
            // alert(token)
      const header =  new HttpHeaders({'x-access-token' : token});
      // tslint:disable-next-line:no-shadowed-variable
      this.globalData = new Observable(observer => {
              let obj: any[] = [];
              // setInterval(() =>
              //           {
              this.http.get<any>(this._userUrl, {headers : header})
                    .subscribe(resp => {
                          obj = resp;
                          observer.next(obj);
                    });
                  // },400)
              });

      });
  }

  // tslint:disable-next-line:typedef

  registerNotesData(){
    return this.globalData;
  }

  // register(sub : Subject<any>){
  //   //return this.sub;
  //   this.globalData.subscribe(sub);
  // }

  // // tslint:disable-next-line:typedef

  // getUser(){
  //     const observable = new Observable(observer => {
  //           this.http.get<any>(this._userUrl).subscribe(resp=>{
  //                   // this.notes = resp;
  //                   observer.next(resp);
  //           })
  //     });
  //     return observable;
  // }
}
