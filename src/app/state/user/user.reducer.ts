import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/api/model/user';
import { createUser, userCreated, userDeleted, userUpdated, usersLoaded } from './user.actions';

export const initialState: Map<number,User> = new Map<number,User>();

const _userReducer = createReducer(
    initialState,
    on(usersLoaded,(state,props)=> {
        const usersMap = new Map<number,User>();
        let a = 0;
        props.users.forEach(user => usersMap.set(a++,user))
        return usersMap;
    }),
    on(userCreated, (state,props) => state.set(props.id,props.user)),
    on(userUpdated, (state,props) => state.set(props.id,props.user)),
    on(userDeleted, (state,props) => {
        state.delete(props.id);
        return state;
    })
)

export function userReducer(state: any, action: any){
    return _userReducer(state,action);
}