import { NgModule } from '@angular/core';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListComponent } from './entry-list/EntryListComponent';
import { EntryFormComponent } from './entry-form/entry-form.component';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    EntriesRoutingModule,
  ],
  declarations: [EntryListComponent, EntryFormComponent]
})
export class EntriesModule { }
