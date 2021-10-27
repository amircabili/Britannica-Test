import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // tslint:disable-next-line:variable-name
  private _userUrl = 'http://localhost:3000/api/user';

  constructor(
    private http: HttpClient
  ) { }

  public notes : any;
  public currentUser: any;
  public observable : Observable<any>;
 
  // tslint:disable-next-line:typedef


  getUser(){
      const observable = new Observable(subscriber => {
            this.http.get<any>(this._userUrl).subscribe(resp=>{              
                    // this.notes = resp;
                    subscriber.next(resp);                        
            })
      });

      return observable;
  }
}
