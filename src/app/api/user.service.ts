import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from './model/user';
import { USER_URL } from './paths';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<User[]>(`${USER_URL}`).pipe(take(1));
  }

  findByCPF(cpf: string) {
    return this.http.get<User[]>(`${USER_URL}/residents?cpf=${cpf}`).pipe(take(1));
  }

  createUser(user: User): Observable<{id: number}>{
    return this.http.post<{id: number}>(`${USER_URL}`,user).pipe(take(1));
  }

  updateUser(user: User,id: number){
    return this.http.put(`${USER_URL}/${id}`,user).pipe(take(1));
  }

  deleteUser(id: number){
    console.log('deleteUser(id: number)',id)
    return this.http.delete(`${USER_URL}/${id}`).pipe(take(1));
  }
}
