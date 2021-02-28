import { AUTH_URL } from './paths';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { AuthInfo } from './model/auth-info';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  tryLogin(email: string, password: string){
    return this.http.post<AuthInfo>(`${AUTH_URL}/login`,{email,password}).pipe(take(1))
  }
}
