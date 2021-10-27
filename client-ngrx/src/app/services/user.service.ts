import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // tslint:disable-next-line:variable-name
  private _userUrl = 'http://localhost:3000/api/user';

  observavle : Observable<any>;

  getObservable()
  {
    return this.observavle;
  }

  constructor(
    private http: HttpClient
  ) { 

    this.observable = new Observable(subscriber => {

      let notes : any[] = [];
       
      this.http.get<any>(this._userUrl).subscribe(resp=>{   

            setInterval(() =>
            {                                                                
                let obj = {...this.notes,  resp}
                subscriber.next(obj);
            },1000)
          })
    });

   }

  public notes : any;
  public currentUser: any;
  public observable : Observable<any>;
 
  // tslint:disable-next-line:typedef

 
  

 
     

     
}
