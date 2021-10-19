import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  // tslint:disable-next-line:variable-name
  private _noteUrl = 'http://localhost:3000/api/';
  public today: any;

  constructor(
  ) { }

  // tslint:disable-next-line:typedef
  getDateToday(){
    this.today = new Date();
    const dd = String(this.today.getDate()).padStart(2, '0');
    const mm = String(this.today.getMonth() + 1).padStart(2, '0');
    const yyyy = this.today.getFullYear();
    const time = new Date(this.today.getTime());

    this.today = dd + '/' + mm + '/' + yyyy + ' - ' + time;
    return this.today;
  }

  // tslint:disable-next-line:typedef
  getNoteEmpty(){
    return{
      authorname: '',
      content : '' ,
      date : this.getDateToday(),
    };
  }

  // tslint:disable-next-line:typedef
  async addNote(note){
    const fetchParams = {
      method : 'POST',
      body : JSON.stringify(note),
      headers : {'Content-Type' : 'application/json'}
    };

    const resp = await fetch(this._noteUrl, fetchParams);
    const status = await resp.json();

    // alert(status);

  }

  // tslint:disable-next-line:typedef
  async updateNote(note){
    const fetchParams = {
      method : 'PUT',
      body : JSON.stringify(note),
      headers : {'Content-Type' : 'application/json'}
    };

    const resp = await fetch(this._noteUrl + note._id, fetchParams);
    const status = await resp.json();

    // alert(status);

  }

  // tslint:disable-next-line:typedef
  async deleteNote(note){
    const fetchParams = {
      method : 'DELETE',
      headers : {'Content-Type' : 'application/json'}
    };

    const resp = await fetch(this._noteUrl + note._id, fetchParams);
    const status = await resp.json();

    // alert(status);

  }

}
