import { authenticationFailure } from './../login/login.actions';
import { serverError } from './../global.actions';
import { User } from 'src/app/api/model/user';
import { UserService } from './../../api/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createUser, loadUsers, usersLoaded, userCreated, updateUser, userUpdated, deleteUser, userDeleted } from './user.actions';
import { exhaustMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserEffects{

    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(loadUsers),
        exhaustMap(value => this.userService.getUsers().pipe(
            tap(value => console.log('Load users effect',value)),
            map(users => usersLoaded({users})),
            catchError( (error:HttpErrorResponse) =>of(serverError({message: error.message})))
        ))
    ))

    createUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(createUser),
            exhaustMap(value => this.userService.createUser(value).pipe(
                map(({id}) => userCreated({user: value,id})),
                catchError((error: HttpErrorResponse) => of(serverError({message: error.message})))
            ))
        )
    );

    updateUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(updateUser),
            exhaustMap(value => this.userService.updateUser(value.user,value.id).pipe(
                map(() => userUpdated({user: value.user,id: value.id})),
                catchError((error: HttpErrorResponse) => of(serverError({message: error.message})))
            ))
        )
    );

    deleteUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(deleteUser),
            exhaustMap(value => this.userService.deleteUser(value.id).pipe(
                map(() => userDeleted({id: value.id})),
                catchError((error: HttpErrorResponse) => of(serverError({message: error.message})))
            ))
        )
    )

    constructor(
        private userService: UserService,
        private actions$: Actions,
    ){}
}