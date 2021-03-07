import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user';
import { USER_URL } from './paths';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<{id: number}>{
    return this.http.post<{id: number}>(`${USER_URL}`,user);
  }
}
