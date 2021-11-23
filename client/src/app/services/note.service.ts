import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { retry } from 'rxjs';
import { tokenReference } from '@angular/compiler';
import { interval, Observable , Subject} from 'rxjs';
import {DataManagerService} from './data-manager.service';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  // tslint:disable-next-line:variable-name
  private _noteUrl = 'http://localhost:4002/api/notes/';
  public today: any;
  public notesServiceData: any;
  private subject = new Subject<any>();

  constructor(
    private http: HttpClient,
    private dataManagerService: DataManagerService,
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
    async getNotes()
    {
        const token = sessionStorage.token;
        console.log('sessionStorage token -' + token);
        const fetchParams = { method : 'GET',
                            headers : { 'x-access-token' : token}
                            };

        // let resp = await fetch("http://localhost:8000/api/products", fetchParams);
        // _notesUrl = 'http://localhost:4002/api/notes/';

        const resp = await fetch(this._noteUrl, fetchParams);
        const notes = await resp.json();
        this.notesServiceData = notes;
        return  notes;
    }

    updateNotes(): void {
       this.subject.next({});
    }

    updateNotesEvent(): Observable<any>{
      return this.subject.asObservable();
    }




  addNote(note): Promise<unknown> {
    const promise = new Promise((resolve, reject) => {
      this.dataManagerService.addNoteData(note).then((response) => {
        // @ts-ignore
        // this.bankIds = response;
        resolve(response);
      })
        .catch((error) => {
          // this.bankIds = error;
          reject(error);
        });
    });
    return promise;
  }

  updateNote(note): Promise<unknown> {
    const promise = new Promise((resolve, reject) => {
      this.dataManagerService.updateNoteData(note).then((response) => {
        // @ts-ignore
        // this.bankIds = response;
        resolve(response);
      })
        .catch((error) => {
          // this.bankIds = error;
          reject(error);
        });
    });
    return promise;
  }


  deleteNote(note): Promise<unknown> {
    const promise = new Promise((resolve, reject) => {
      this.dataManagerService.deleteNoteData(note).then((response) => {
        // @ts-ignore
        // this.bankIds = response;
        resolve(response);
      })
        .catch((error) => {
          // this.bankIds = error;
          reject(error);
        });
    });
    return promise;
  }


}
