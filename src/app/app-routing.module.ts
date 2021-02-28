import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '',redirectTo: 'login',pathMatch: 'full'},
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) ,data: {preload: true}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
