import { AppState } from './../app.state';
import { createSelector } from '@ngrx/store';
import { User } from 'src/app/api/model/user';

export const selectAllUsers = createSelector(
  (state: AppState) => state.user,
  userMap => Array.from(userMap.values())   
);

export const selectUserById = createSelector(
    (state: AppState,props: {id: number}) => state.user,
    (userMap: Map<number,User>,props: {id: number}) => userMap.get(props.id)
)

export const selectUsersByName = createSelector(
  (state: AppState,props: {name: string}) => state.user,
  (userMap: Map<number,User>,props: {name: string}) => {
    const usersSelected: User[] = []
    userMap.forEach( value => {
      if(value.name.toLocaleLowerCase().includes(props.name.toLocaleLowerCase())){
        usersSelected.push(value);
      }
    })
    console.log("Users selected =>",usersSelected);
    return usersSelected;
  }
);