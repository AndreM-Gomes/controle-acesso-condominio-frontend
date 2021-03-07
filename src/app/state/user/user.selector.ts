import { AppState } from './../app.state';
import { createSelector } from '@ngrx/store';
import { User } from 'src/app/api/model/user';

export const selectAllUsers = createSelector(
  (state: AppState) => state.user,
  userMap => Array.from(userMap.values())   
);

export const selectUserById = createSelector(
    (state: AppState) => state.user,
    (userMap: Map<number,User>,props: {id: number}) => userMap.get(props.id)
)
