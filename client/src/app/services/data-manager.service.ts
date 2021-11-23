import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  // tslint:disable-next-line:variable-name
  private _noteUrl = 'http://localhost:4002/api/notes/';
  constructor() { }

  // tslint:disable-next-line:typedef
  async addNoteData(note){
    const fetchParams = {
      method : 'POST',
      body : JSON.stringify(note),
      headers : {'Content-Type' : 'application/json'}
    };

    const resp = await fetch(this._noteUrl, fetchParams);
    return status = await resp.json();

    // alert(status);

  }


  // tslint:disable-next-line:typedef
  async updateNoteData(note){
    const fetchParams = {
      method : 'PUT',
      body : JSON.stringify(note),
      headers : {'Content-Type' : 'application/json'}
    };

    const resp = await fetch(this._noteUrl + note._id, fetchParams);
    return status = await resp.json();

    // alert(status);

  }

  // tslint:disable-next-line:typedef
  async deleteNoteData(note){
    const fetchParams = {
      method : 'DELETE',
      headers : {'Content-Type' : 'application/json'}
    };

    const resp = await fetch(this._noteUrl + note._id, fetchParams);
    return status = await resp.json();


    // alert(status);

  }

}
