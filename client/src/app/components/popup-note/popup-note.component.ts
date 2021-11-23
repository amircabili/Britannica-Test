import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NoteService} from '../../services/note.service';
import {Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LocalService } from 'src/app/services/LocalService.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-popup-note',
  templateUrl: './popup-note.component.html',
  styleUrls: ['./popup-note.component.scss']
})
export class PopupNoteComponent implements OnInit {
  public note;
  public thisIsNewNote = false;

  public noteAuthorname: any;
  public noteContent: any;
  public noteDate: any;
  observ: Subject<any>;
  public errorField = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public noteService: NoteService,
    public localService: LocalService,
    public router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.observ  = new Subject<any>();
   }

  ngOnInit(): void {
    if (!this.data){
      this.note = this.noteService.getNoteEmpty();
      this.noteAuthorname = this.note.authorname;
      this.noteContent = this.note.content;
      this.thisIsNewNote = true;
    } else{
      this.note = this.data;
      this.thisIsNewNote = false;
    }
  }

  finishFunction(): void {
    this.dialogRef.close();
  }

  // tslint:disable-next-line:typedef
  updatenote(note: any) {
    this.noteService.updateNote(note).then(() => {
      this.errorField = false;
      this.noteService.updateNotes();
      this.dialogRef.close();
    });
  }

  // tslint:disable-next-line:typedef
  deletenote(note: any) {
    this.noteService.deleteNote(note).then(() => {
      this.errorField = false;
      this.noteService.updateNotes();
      this.dialogRef.close();
    });

  }

  createnote(note) {
  if (this.note.authorname && this.note.content){
      this.noteService.addNote(note).then(() => {
        this.errorField = false;
        this.noteService.updateNotes();
        this.dialogRef.close();
      });

      // location.reload();
    } else{
       this.errorField = true;
    }
  }


}
