import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EntriesRoutingModule } from './entries-routing.module';

import { EntryListComponent } from './entry-list/EntryListComponent';

import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EntriesRoutingModule,
    CalendarModule,
    IMaskModule
  ],
  declarations: [EntryListComponent]
})
export class EntriesModule { }
