import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from './state/login/auth-state';
import { authenticationFailure, sucessfullAuthentication } from './state/login/login.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'sistema-condominio';
  
  constructor(
    private store: Store
  ){}

  ngOnInit(): void {
    const userJson = localStorage.getItem("userInfo");
        if(userJson){
            const user = JSON.parse(userJson);
            this.store.dispatch(sucessfullAuthentication(new AuthState(true,user.accessToken,user.name,user.role,user.email)))
        }else{
            return this.store.dispatch((authenticationFailure("Não se logou ainda")));
        }
  }
}
