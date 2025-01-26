import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryComponent } from './diary/diary.component';
import { NewEntryFormTemplateComponent } from './new-entry-form-template/new-entry-form-template.component';

const routes: Routes = [
  {
    path: '',
    component: DiaryComponent,
  },
  {
    path: 'new-template',
    component: NewEntryFormTemplateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiaryRoutingModule {}
