import { AuthState } from './login/auth-state';
import { AuthInfo } from '../api/model/auth-info';
import { User } from '../api/model/user';

export interface AppState {
    authInfo: AuthState,
    user: Map<number,User>
}