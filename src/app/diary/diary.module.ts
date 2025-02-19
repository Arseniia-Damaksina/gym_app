import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaryRoutingModule } from './diary-routing.module';
import { NewEntryFormTemplateComponent } from './new-entry-form-template/new-entry-form-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewEntryFormReactiveComponent } from './new-entry-form-reactive/new-entry-form-reactive.component';

@NgModule({
  declarations: [
    NewEntryFormTemplateComponent,
    NewEntryFormReactiveComponent,
  ],
  imports: [
    CommonModule,
    DiaryRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DiaryModule {}
