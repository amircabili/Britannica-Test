import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NoteService} from '../../services/note.service';
import {Router} from '@angular/router';

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

  public errorField = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public noteService: NoteService,
    public router: Router
  ) { }

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
   this.noteService.updateNote(note);
   this.dialogRef.close();
  }

  // tslint:disable-next-line:typedef
  deletenote(note: any) {
     this.noteService.deleteNote(note);
     this.dialogRef.close();
     location.reload();
  }


  // tslint:disable-next-line:typedef


  createnote(note) {
  if (this.note.authorname && this.note.content){
      this.noteService.addNote(note);
      this.errorField = false;
      this.dialogRef.close();
      location.reload();
    } else{
       this.errorField = true;
    }
  }
}
