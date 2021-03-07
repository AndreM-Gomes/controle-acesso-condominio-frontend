import { User } from 'src/app/api/model/user';
import { UserService } from './../../api/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createUser } from './user.actions';
import { exhaustMap } from 'rxjs/operators';

@Injectable()
export class UserEffects{

    constructor(
        private userService: UserService,
        private actions$: Actions,
    ){}
}