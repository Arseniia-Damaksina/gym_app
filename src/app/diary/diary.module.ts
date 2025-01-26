import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaryComponent } from './diary/diary.component';
import { DiaryRoutingModule } from './diary-routing.module';
import { EntryItemComponent } from './entry-item/entry-item.component';
import { ListEntriesComponent } from './list-entries/list-entries.component';
import { NewItemButtonComponent } from './new-item-button/new-item-button.component';
import { NewEntryFormTemplateComponent } from './new-entry-form-template/new-entry-form-template.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DiaryComponent,
    EntryItemComponent,
    ListEntriesComponent,
    NewItemButtonComponent,
    NewEntryFormTemplateComponent,
  ],
  imports: [CommonModule, DiaryRoutingModule, RouterModule, FormsModule],
})
export class DiaryModule {}
