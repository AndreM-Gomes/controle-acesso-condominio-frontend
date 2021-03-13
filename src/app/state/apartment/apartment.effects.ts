import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { ApartmentService } from "src/app/api/apartment.service";
import { serverError } from "../global.actions";
import { apartmentCreated, apartmentDeleted, apartmentsLoaded, apartmentUpdated, createApartment, deleteApartment, loadApartments, updateApartment } from "./apartment.actions";

@Injectable()
export class ApartmentEffects{

    loadApartments$ = createEffect(() => this.actions$.pipe(
        ofType(loadApartments),
        exhaustMap(value => this.apartmentService.getApartments().pipe(
            tap(value => console.log('Load apartments effect',value)),
            map(apartments => apartmentsLoaded({apartments})),
            catchError( (error:HttpErrorResponse) =>of(serverError({message: error.message})))
        ))
    ));

    createApartment$ = createEffect(
        () => this.actions$.pipe(
            ofType(createApartment),
            exhaustMap(value => this.apartmentService.createApartment(value).pipe(
                map((apartment) => apartmentCreated({apartment,id: apartment.id as number})),
                catchError((error: HttpErrorResponse) => of(serverError({message: error.message})))
            ))
        )
    );

    updateApartment$ = createEffect(
        () => this.actions$.pipe(
            ofType(updateApartment),
            exhaustMap(value => this.apartmentService.updateApartment(value.apartment,value.id).pipe(
                map( apartment => apartmentUpdated({apartment,id: value.id})),
                catchError((error: HttpErrorResponse) => of(serverError({message: error.message})))
            ))
        )
    );

    deleteApartment$ = createEffect(
        () => this.actions$.pipe(
            ofType(deleteApartment),
            tap(console.log),
            exhaustMap(value => {
                console.log('Dentro do  ');
                return this.apartmentService.deleteApartment(value.id).pipe(
                    map(() => apartmentDeleted({id: value.id})),
                    catchError((error: HttpErrorResponse) => of(serverError({message: error.message})))
                )
            })
        )
    )

    constructor(
        private apartmentService: ApartmentService,
        private actions$: Actions,
        private store: Store
    ){}
}
