import { AuthInterceptor } from './api/auth.interceptor';
import { UserEffects } from './state/user/user.effect';
import { LoginEffects } from './state/login/login.effect';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { reducer as loginReducer } from './state/login/login.reducer';
import { MenuComponent } from './pages/menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { userReducer } from "../app/state/user/user.reducer";
import { FirstAccessEffects } from './state/first-access/first-access.effect';
import { ApartmentEffects } from './state/apartment/apartment.effects';
import { apartmentReducer } from './state/apartment/apartment.reducer';
import { cpfReducer } from './state/user/found-by-cpf.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      authInfo:loginReducer,
      user: userReducer,
      apartment: apartmentReducer,
      usersFoundByCpf: cpfReducer
    }),
    EntityDataModule.forRoot(entityConfig),
    EffectsModule.forRoot([
      LoginEffects,
      UserEffects,
      FirstAccessEffects,
      ApartmentEffects
    ]),
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],

  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
