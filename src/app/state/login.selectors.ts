import { AuthInfo } from './../api/model/auth-info';
import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { AuthState } from './auth-state';

export const selectAuthInfo = createSelector(
    (state: AppState) => state.authInfo,
    (state: AuthState) => state
)