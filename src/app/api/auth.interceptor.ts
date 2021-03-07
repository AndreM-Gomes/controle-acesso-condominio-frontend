import { exhaustMap } from 'rxjs/operators';
import { selectAuthInfo } from './../state/login/login.selectors';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../state/app.state';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(
        private store: Store<AppState>
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store
            .select(selectAuthInfo)
            .pipe(
                exhaustMap( authInfo => {
                    console.log(authInfo)
                    const authReq = req.clone({
                        headers: req.headers.set('Authorization', `Bearer ${authInfo.accessToken}`)
                      });
                    return next.handle(authReq);
                })
            )
    }

}