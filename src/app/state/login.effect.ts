import { sucessfullAuthentication, tryLogin, authenticationFailure } from './login.actions';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginService } from '../api/login.service';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthState } from './auth-state';

@Injectable()
export class LoginEffects{
    doLogin$ = createEffect(() => this.actions$.pipe(
        ofType(tryLogin),
        exhaustMap(({email,password}) => this.loginService.tryLogin(email,password).pipe(
            map(authInfo => sucessfullAuthentication(new AuthState(true,authInfo.accessToken,authInfo.name,authInfo.role,authInfo.email))),
            catchError(error => of(authenticationFailure(error)))
        ))
    )
    );

    constructor(
        private actions$: Actions,
        private loginService: LoginService
    ){}
}