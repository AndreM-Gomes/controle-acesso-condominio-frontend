import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { AUTH_URL } from './paths';

@Injectable({
  providedIn: 'root'
})
export class FirstAccessService {

  constructor(private http: HttpClient) { }

  tryFirstAccess(firstAccessInfo: {email: string, password: string}){
    return this.http.post<string>(`${AUTH_URL}/first-access`,firstAccessInfo).pipe(take(1))
  }
}
