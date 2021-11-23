import { Component, OnInit , OnDestroy, ChangeDetectorRef } from '@angular/core';
import {UserService} from '../../services/user.service';
import {HttpClient, HttpErrorResponse, HttpHeaders, } from '@angular/common/http';
import {Router} from '@angular/router';
import {GlobalFunctionsService} from '../../services/global-functions.service';
import { NoteService } from 'src/app/services/note.service';
import { LocalService } from 'src/app/services/LocalService.service';

import { select, Store } from '@ngrx/store';
import { Note } from '../../models/note.model';
import { interval, Observable , Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  public globalNotes: Subscription;
  // tslint:disable-next-line:variable-name
  private _notesUrl = 'http://localhost:4002/api/notes/';
  sub: Subject<any>;
  notesData: any;

  private noteSelectedData: any;
  private subscription;

  constructor(
    private userService: UserService,
    private noteService: NoteService,
    private globalFunctionsService: GlobalFunctionsService,
    private router: Router,
    private store: Store<{notes: Note[]}>,
    private localService: LocalService,
    private cd: ChangeDetectorRef,
    private http: HttpClient
  ) {


    this.subscription = this.noteService.updateNotesEvent().subscribe(messege => {
      this.loadData();
    });
  }

  // tslint:disable-next-line:typedef
  loadData(){
    this.noteService.getNotes().then(response =>
      {
        this.notesData  = response;
      }
    );
  }

  ngOnInit(): void {
    this.loadData();
  }

  // tslint:disable-next-line:typedef
  updateCollect() {
    this.noteService.updateNotes();
  }

  // tslint:disable-next-line:typedef
  onClock(){
    this.sub.next({text: 'CustomerID'});
  }


  // tslint:disable-next-line:typedef
  openPopUpNote(indexItem) {
    // @ts-ignore
    this.dialogRef = this.globalFunctionsService.openItemModal(indexItem).then((response) => {
      this.noteSelectedData = response;

    })
      .catch((error) => {
        //
      });
  }

  // tslint:disable-next-line:typedef
  openPopUpAddNote() {
    // @ts-ignore
    this.dialogRef = this.globalFunctionsService.openItemModal().then(() => {
    })
      .catch((error) => {
        //
      });
  }

}
