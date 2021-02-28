import { AuthState } from './auth-state';
import { AuthInfo } from './../api/model/auth-info';

export interface AppState {
    authInfo: AuthState
}