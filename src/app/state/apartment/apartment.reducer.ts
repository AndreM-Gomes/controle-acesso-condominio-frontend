import { createReducer, on } from "@ngrx/store";
import { Apartment } from "src/app/api/model/apartment";
import { apartmentCreated, apartmentDeleted, apartmentsLoaded, apartmentUpdated } from "./apartment.actions";

export const initialState: Map<number,Apartment> = new Map<number,Apartment>();

const _apartmentReducer = createReducer(
    initialState,
    on(apartmentsLoaded,(state,props)=> {
        const apartmentsMap = new Map<number,Apartment>();
        props.apartments.forEach(apartment => apartmentsMap.set(apartment.id as number,apartment))
        console.log('Apartments loaded on reducer. State =>',state);
        return apartmentsMap;
    }),
    on(apartmentCreated, (state,props) => {
        state.set(props.id,{...props.apartment,id: props.id});
        console.log('Apartment created on reducer. State =>',state);
        return new Map(state);
    }),
    on(apartmentUpdated, (state,props) => {
        state.set(props.id,props.apartment);
        console.log('Apartment updated on reducer. State =>',state);
        return new Map(state);
    }),
    on(apartmentDeleted, (state,props) => {
        state.delete(props.id);
        console.log('Apartment deleted on reducer. State =>',state);
        return new Map(state);
    })
)

export function apartmentReducer(state: any, action: any){
    return _apartmentReducer(state,action);
}