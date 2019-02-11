import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule,
    RouterModule,
  ],
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule,
    RouterModule,

    BreadCrumbComponent,
    PageHeaderComponent
  ]
})
export class SharedModule { }
