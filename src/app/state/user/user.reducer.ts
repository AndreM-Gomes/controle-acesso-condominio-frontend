import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/api/model/user';
import { createUser, userCreated, userDeleted, userEdited, userUpdated } from './user.actions';

export const initialState: Map<number,User> = new Map<number,User>();

const _userReducer = createReducer(
    initialState,
    on(userCreated, (state,props) => state.set(props.id,props.user)),
    on(userUpdated, (state,props) => state.set(props.id,props.user)),
    on(userDeleted, (state,props) => {
        state.delete(props.id);
        return state;
    })
)

export function reducer(state: any, action: any){
    return _userReducer(state,action);
}