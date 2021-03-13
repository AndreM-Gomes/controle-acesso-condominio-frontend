import { createAction, props } from '@ngrx/store';
import { Apartment } from 'src/app/api/model/apartment';
import { ApartmentDTO } from 'src/app/api/model/apartment.dto';

export const loadApartments = createAction(
    '[Apartment] Load Apartments'
);

export const apartmentsLoaded = createAction(
    '[Apartment] Apartments Loaded',
    props<{apartments: Apartment[]}>()
);

export const createApartment = createAction(
    '[Apartment] Create Apartment',
    props<ApartmentDTO>()
);

export const updateApartment = createAction(
    '[Apartment] Edit Apartment',
    props<{apartment: ApartmentDTO,id: number}>()
);

export const deleteApartment = createAction(
    '[Apartment] Delete Apartment',
    props<{id: number}>()
);

export const apartmentCreated = createAction(
    '[Apartment] Apartment created',
    props<{apartment: Apartment,id: number}>()
);

export const apartmentUpdated = createAction(
    '[Apartment] Apartment updated',
    props<{apartment: Apartment,id: number}>()
);

export const apartmentDeleted = createAction(
    '[Apartment] Apartment Deleted',
    props<{id: number}>()
);
