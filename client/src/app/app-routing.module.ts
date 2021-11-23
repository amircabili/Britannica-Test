import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {ContactPageComponent} from './components/contact-page/contact-page.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {UserPageComponent} from './components/user-page/user-page.component';
import {AuthGuard} from './auth.guard';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';
import {NoteService} from './services/note.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptorService} from './services/token-interceptor.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

const routes: Routes = [
  {
      path: '',
     redirectTo: '/user',
     pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'user',
    component: UserPageComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthService,
    UserService,
    NoteService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    AuthGuard
  ],
})
export class AppRoutingModule {
}
