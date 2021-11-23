import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {AuthService} from './services/auth.service';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {AuthGuard} from './auth.guard';
import {UserPageComponent} from './components/user-page/user-page.component';
import {TokenInterceptorService} from './services/token-interceptor.service';
import {UserService} from './services/user.service';
import {NoteService} from './services/note.service';
import { PopupNoteComponent } from './components/popup-note/popup-note.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {SortByPipe} from './pipes/order-by.pipe';
import {HttpClient, HttpHeaders, HttpResponse, HttpRequest} from '@angular/common/http'

import { StoreModule } from '@ngrx/store';
import { NoteReducer } from './noteReducer';
import { RouterModule, Routes } from '@angular/router';


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
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContactPageComponent,
    HomePageComponent,
    LoginPageComponent,
    UserPageComponent,
    PopupNoteComponent,
    SortByPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserModule,
    StoreModule.forRoot({notes : NoteReducer}),
    [RouterModule.forRoot(routes)]
  ],
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
  bootstrap: [AppComponent]
})
export class AppModule { }
