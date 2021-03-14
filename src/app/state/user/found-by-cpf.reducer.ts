import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/api/model/user";
import { foundedByCPF } from "./user.actions";

const initialState: User[] = [];

const _foundByCpfReducer = createReducer(
    initialState,
    on(foundedByCPF,(state,props) => props.users)
)

export function cpfReducer(state: any, action: any){
    return _foundByCpfReducer(state,action);
}