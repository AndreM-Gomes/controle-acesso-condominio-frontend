import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueryRoutingModule } from './query-routing.module';
import { QueryComponent } from './query.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersTableComponent } from './users-table/users-table.component';


@NgModule({
  declarations: [QueryComponent, UsersTableComponent],
  imports: [
    CommonModule,
    QueryRoutingModule,
    SharedModule
  ]
})
export class QueryModule { }
