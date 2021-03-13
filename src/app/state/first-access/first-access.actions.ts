import { createAction, props } from "@ngrx/store";

export const tryFirstAccess = createAction(
    '[First Access] Try First Access',
    props<{email: string, password: string}>()
)

export const sucessfullFirstAccess = createAction(
    '[First Access] Sucessfull First Access'
)

export const firstAccessFailure = createAction(
    '[First Access] First Access Failure'
)