import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartmentsRoutingModule } from './apartments-routing.module';
import { ApartmentsComponent } from './apartments.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApartmentFormComponent } from './apartment-form/apartment-form.component';
import { ApartmentTableComponent } from './apartment-table/apartment-table.component';
import { ResidentsTableComponent } from './residents-table/residents-table.component';


@NgModule({
  declarations: [ApartmentsComponent, ApartmentFormComponent, ApartmentTableComponent, ResidentsTableComponent],
  imports: [
    CommonModule,
    ApartmentsRoutingModule,
    SharedModule
  ]
})
export class ApartmentsModule { }
