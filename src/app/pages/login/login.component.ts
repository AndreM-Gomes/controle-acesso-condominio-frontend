import { selectAuthInfo } from './../../state/login.selectors';
import { tryLogin } from './../../state/login.actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthInfo } from 'src/app/api/model/auth-info';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>
    ) { 
    this.loginForm = fb.group({
      email: ['',Validators.email],
      password: ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  tryLogin(){
    this.store.dispatch(tryLogin(this.loginForm.value));
    this.store.pipe(select(selectAuthInfo)).subscribe(console.log)
  }
}
