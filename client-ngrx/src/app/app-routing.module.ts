import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {ContactPageComponent} from './components/contact-page/contact-page.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {UserPageComponent} from './components/user-page/user-page.component';
import {AuthGuard} from './auth.guard';

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
  exports: [RouterModule]
})
export class AppRoutingModule {
}
