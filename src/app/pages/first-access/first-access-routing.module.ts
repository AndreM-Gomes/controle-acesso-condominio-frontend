import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstAccessComponent } from './first-access.component';

const routes: Routes = [{ path: '', component: FirstAccessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirstAccessRoutingModule { }
