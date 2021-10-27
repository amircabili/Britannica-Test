import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserService} from '../../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {GlobalFunctionsService} from '../../services/global-functions.service';
import { NoteService } from 'src/app/services/note.service';
import { select, Store } from '@ngrx/store';
import { Observable ,Subscription} from 'rxjs';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  notes : Observable<Note[]>;

  notesData: any;
  public subscriber: Subscription;
  public noteSelectedData: any;
  
  constructor(
    public userService: UserService,
    public noteService: NoteService,
    public globalFunctionsService: GlobalFunctionsService,
    public router: Router,
    private store : Store<{notes : Note[]}>
  ) {  }

  ngOnInit(): void {

    ///////////store////////
    this.notes = this.store.select(data =>data.notes)
    ///////////////////

    this.subscriber = this.userService.getObservable().subscribe(res => {
          console.log('getUser() subscribe data - ' + JSON.stringify(res));
          this.notesData = res}
          , 
          err=> console.log(err)
      );
  }

  ngOnDestroy(){
    this.subscriber.unsubscribe();
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
