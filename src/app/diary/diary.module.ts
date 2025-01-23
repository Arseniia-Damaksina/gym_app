import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaryComponent } from './diary/diary.component';
import { DiaryRoutingModule } from './diary-routing.module';
import { EntryItemComponent } from './entry-item/entry-item.component';



@NgModule({
  declarations: [
    DiaryComponent,
    EntryItemComponent
  ],
  imports: [
    CommonModule, DiaryRoutingModule
  ]
})
export class DiaryModule { }
