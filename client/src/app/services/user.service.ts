import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, interval, Observable ,Subject} from 'rxjs';
import { LocalService } from './LocalService.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // tslint:disable-next-line:variable-name
  private _userUrl = 'http://localhost:4002/api/notes';

  public globalData :Observable<any>;

  
  constructor(
    private http: HttpClient,
    private localService: LocalService
    
  ) { 

    this.globalData = new Observable(observer => {
      let obj : any[] = [];
      // setInterval(() =>
      //           { 
            this.http.get<any>(this._userUrl)
            .subscribe(resp=>{                                                      
                  obj = resp
                  observer.next(obj);                                                     
            }) 
          // },400) 
      });
  }

 
  
  // tslint:disable-next-line:typedef

  registerNotesData(){
    return this.globalData;
  }

  getUser(){
    return this.http.get<any>(this._userUrl);
  }
}
