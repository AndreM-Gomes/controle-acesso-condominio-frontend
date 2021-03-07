import { sucessfullAuthentication, tryLogin, authenticationFailure, sucessfullLogin, logout } from './login.actions';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginService } from '../../api/login.service';
import { map, mergeMap, catchError, exhaustMap, tap } from 'rxjs/operators';
import { defer, of } from 'rxjs';
import { AuthState } from './auth-state';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffects{

    doLogin$ = createEffect(() => this.actions$.pipe(
        ofType(tryLogin),
        exhaustMap(({email,password}) => this.loginService.tryLogin(email,password).pipe(
            map(authInfo => sucessfullLogin(new AuthState(true,authInfo.accessToken,authInfo.name,authInfo.role,authInfo.email))),
            catchError(error => of(authenticationFailure(error)))
        ))
    ));
    sucessfullLogin$ = createEffect(() => this.actions$.pipe(
        ofType(sucessfullLogin),
        tap( action => {
            localStorage.setItem("userInfo",JSON.stringify({
                isAuthenticated: action.isAuthenticated,
                accessToken: action.accessToken,
                name: action.name,
                role: action.role,
                email: action.email
            }))
            this.router.navigate(['/administracao'])
        })
    ),{dispatch: false});
    logout$ = createEffect(() => this.actions$.pipe(
        ofType(logout),
        tap(action => {
            localStorage.clear();
            this.router.navigate(['/login'])
        })
    ),{dispatch: false});

    constructor(
        private actions$: Actions,
        private loginService: LoginService,
        private router: Router
    ){}
}