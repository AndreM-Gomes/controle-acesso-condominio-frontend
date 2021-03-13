import { AuthState } from './login/auth-state';
import { AuthInfo } from '../api/model/auth-info';
import { User } from '../api/model/user';
import { Apartment } from '../api/model/apartment';

export interface AppState {
    authInfo: AuthState;
    user: Map<number,User>;
    apartment: Map<number,Apartment>
}