import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  registerUserData: FormGroup;
  loginUserData: FormGroup;
  sub: Subscription;

  // tslint:disable-next-line:variable-name
  constructor(
    // tslint:disable-next-line:variable-name
    private _auth: AuthService,
    // tslint:disable-next-line:variable-name
    private _router: Router,
    public formBuilder: FormBuilder
  ) {
    this.registerUserData = formBuilder.group({
      email: '',
      password: ''
    });

    this.loginUserData = formBuilder.group({
      email: '',
      password: ''
    });
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.registerUserData = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required]
    });

    this.loginUserData = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required]
    });

  }

  // tslint:disable-next-line:typedef
  loginUser() {
    if (this.loginUserData.valid) {
      // console.log(this.loginUserData);
      this._auth.loginUser(this.loginUserData.value)
        .then(
          data => {
            sessionStorage.token = data.token;
            this._router.navigate(['/user']);
          }
        );
    }
    else{
      alert('no valid');
    }
  }

  // tslint:disable-next-line:typedef
  registerUser(){
    if (this.registerUserData.valid) {
      // console.log(this.registerUserData);
      this._auth.registerUser(this.registerUserData.value)
        .then(
          registerRes => {
            console.log(registerRes);
            sessionStorage.token = registerRes.token;
            this._router.navigate(['/user']);
          }
        );
    }
    else{
      alert('no valid');
    }
  }

}
