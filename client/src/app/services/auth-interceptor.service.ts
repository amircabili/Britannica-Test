import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authSrv: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    console.log('Interceptor called !');
    let authReq = req;
    const token = this.authSrv.getToken();
    if (token != null)
    {
      authReq = req.clone({headers : req.headers.set('x-access-token', token)});
    }
    return next.handle(authReq);

  }
}
