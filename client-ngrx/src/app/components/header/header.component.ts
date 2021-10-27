import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NoteService} from '../../services/note.service';
import {GlobalFunctionsService} from "../../services/global-functions.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public globalFunctionsService: GlobalFunctionsService,
  ) { }

  ngOnInit(): void {
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
