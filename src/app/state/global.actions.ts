import { createAction, props } from '@ngrx/store';

export const serverError = createAction(
    '[Error] Server error',
    props<{message: string}>()
);