import { User } from "./user";

export interface Apartment{
    id?: number;
    apartmentNumber: string;
    residents: User[]
}