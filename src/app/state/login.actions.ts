import { AuthState } from './auth-state';
import { AuthInfo } from './../api/model/auth-info';
import { createAction, props } from '@ngrx/store';

export const tryLogin = createAction(
    '[Auth] Try Login',
    props< {email: string, password: string}>()
    )
export const sucessfullAuthentication = createAction(
    '[Auth] Sucessfull Authentication',
    props<AuthState>()
);
export const authenticationFailure = createAction(
    '[Auth] Authentication Failure',
    props<any>()
)

export const logout = createAction('[Auth] Logout')
