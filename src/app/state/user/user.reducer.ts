import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/api/model/user';
import { createUser, userCreated, userDeleted, userUpdated, usersLoaded, foundedByCPF } from './user.actions';

export const initialState: Map<number,User> = new Map<number,User>();

const _userReducer = createReducer(
    initialState,
    on(usersLoaded,(state,props)=> {
        const usersMap = new Map<number,User>();
        props.users.forEach(user => usersMap.set(user.id as number,user))
        console.log('Users loaded on reducer. State =>',state);
        return usersMap;
    }),
    on(userCreated, (state,props) => {
        state.set(props.id,{...props.user,id: props.id});
        console.log('User created on reducer. State =>',state);
        return new Map(state);
    }),
    on(userUpdated, (state,props) => {
        state.set(props.id,props.user);
        console.log('User updated on reducer. State =>',state);
        return new Map(state);
    }),
    on(userDeleted, (state,props) => {
        state.delete(props.id);
        console.log('User deleted on reducer. State =>',state);
        return new Map(state);
    })
)

export function userReducer(state: any, action: any){
    return _userReducer(state,action);
}