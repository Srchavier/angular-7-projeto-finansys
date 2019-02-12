import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports/reports.component';
import { Routes } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    ReportsRoutingModule
  ],
  declarations: [ReportsComponent],
})
export class ReportsModule { }
