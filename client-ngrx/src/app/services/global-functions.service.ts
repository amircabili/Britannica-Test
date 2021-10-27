import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {PopupNoteComponent} from '../components/popup-note/popup-note.component';

@Injectable({
  providedIn: 'root'
})
export class GlobalFunctionsService {

  constructor(
    public matDialog: MatDialog,
  ) { }


  // tslint:disable-next-line:typedef
  openItemModal(data) {
    const promise = new Promise((resolve, reject) => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.id = 'global-functions-modal-component';
      dialogConfig.height = '500px';
      dialogConfig.maxHeight = '500px';
      dialogConfig.width = '55%';
      dialogConfig.maxWidth = '650px';
      dialogConfig.data = data;
      const modalDialog = this.matDialog.open(PopupNoteComponent, dialogConfig);
      modalDialog.afterClosed().subscribe(result => {
        console.log('The dialog was closed ------>' + result);
        if (result) {
          resolve(result);
        } else {
          reject(null);
        }
      });
    });
    return promise;
  }


}
