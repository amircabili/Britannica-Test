import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    public injector: Injector
  ) { }

  // tslint:disable-next-line:typedef
  intercept(req, next){
    const authService = this.injector.get(AuthService);
    const tokenizeReq = req.clone({
      setHeaders: {
          Authorization: `Bearer ${authService.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }
}
