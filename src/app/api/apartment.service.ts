import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Apartment } from './model/apartment';
import { ApartmentDTO } from './model/apartment.dto';
import { User } from './model/user';
import { APARTMENT_URL, USER_URL } from './paths';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  constructor(private http: HttpClient) { }

  findNonResidents(name: string) {
    return this.http.get<User[]>(`${USER_URL}/residables?name=${name}`).pipe(take(1))
  }

  getApartments(){
    return this.http.get<Apartment[]>(`${APARTMENT_URL}`).pipe(take(1));
  }

  createApartment(apartment: ApartmentDTO): Observable<Apartment>{
    return this.http.post<Apartment>(`${APARTMENT_URL}`,apartment).pipe(take(1));
  }

  updateApartment(apartment: ApartmentDTO,id: number){
    return this.http.put<Apartment>(`${APARTMENT_URL}/${id}`,apartment).pipe(take(1));
  }

  deleteApartment(id: number){
    console.log('deleteApartment(id: number)',id)
    return this.http.delete(`${APARTMENT_URL}/${id}`).pipe(take(1));
  }
}
