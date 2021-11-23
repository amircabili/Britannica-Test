import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // tslint:disable-next-line:variable-name
  private _userUrl = 'http://localhost:4002/api/notes';
  constructor(

  ) { }
}
