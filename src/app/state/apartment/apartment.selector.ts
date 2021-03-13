import { createSelector } from "@ngrx/store";
import { Apartment } from "src/app/api/model/apartment";
import { AppState } from "../app.state";

export const selectAllApartments = createSelector(
    (state: AppState) => state.apartment,
    apartmentMap => Array.from(apartmentMap.values())   
  );
  
  export const selectApartmentById = createSelector(
      (state: AppState,props: {id: number}) => state.apartment,
      (apartmentMap: Map<number,Apartment>,props: {id: number}) => apartmentMap.get(props.id)
  )