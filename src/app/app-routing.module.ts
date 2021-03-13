import { AuthGuard } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '',redirectTo: 'login',pathMatch: 'full'},
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
  { path: 'administracao', loadChildren: () => import('./pages/administration/administration.module').then(m => m.AdministrationModule), canActivate: [AuthGuard]},
  { path: 'primeiro-acesso', loadChildren: () => import('./pages/first-access/first-access.module').then(m => m.FirstAccessModule) },
  { path: 'apartamentos', loadChildren: () => import('./pages/apartments/apartments.module').then(m => m.ApartmentsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
