import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from './services/auth.service';
import { Observable } from 'rxjs';

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(
      // tslint:disable-next-line:variable-name
      private _authService: AuthService,
      // tslint:disable-next-line:variable-name
      private _router: Router
    ){}

  canActivate(): boolean {
      if (this._authService.loggedIn()){
        return true;
      }else{
        this._router.navigate(['/login']);
        return false;
      }
  }
}
