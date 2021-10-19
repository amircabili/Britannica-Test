import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {GlobalFunctionsService} from '../../services/global-functions.service';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  notes: any;
  private noteSelectedData: any;

  constructor(
    public userService: UserService,
    public globalFunctionsService: GlobalFunctionsService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getUser()
      .subscribe(
        res => this.notes = res,
        err => {
          if (err instanceof HttpErrorResponse){
            if (err.status === 401){
              this.router.navigate(['/login']);
            }
          }
        }
      );
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
