import { Action, createReducer, on, State } from '@ngrx/store';
import { AuthState } from './auth-state';
import { sucessfullAuthentication, tryLogin } from './login.actions';

export const initialState: AuthState = new AuthState(false,'','','','');

const _authReducer = createReducer(
    initialState,
    on(sucessfullAuthentication, (state,{name,accessToken,role,email}) => new AuthState(true,accessToken,name,role,email))
)

export function reducer(state: any, action: any){
    return _authReducer(state,action);
}