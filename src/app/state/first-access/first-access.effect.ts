import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { FirstAccessService } from "src/app/api/first-access.service";
import { firstAccessFailure, sucessfullFirstAccess, tryFirstAccess } from "./first-access.actions";

@Injectable()
export class FirstAccessEffects{
    doFirstAccess$ = createEffect(() => this.actions$.pipe(
        ofType(tryFirstAccess),
        exhaustMap( value => this.firstAccessService.tryFirstAccess(value).pipe(
            map(() => sucessfullFirstAccess()),
            catchError( error => of(firstAccessFailure()))
        ))
    ));

    sucessfullFirstAccess$ = createEffect(() => this.actions$.pipe(
        ofType(sucessfullFirstAccess),
        tap(action => {
            this.router.navigate(['/login'])
        })
    ),{dispatch: false});

    constructor(
        private actions$: Actions,
        private firstAccessService: FirstAccessService,
        private router: Router
    ){}
}