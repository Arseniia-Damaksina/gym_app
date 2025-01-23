import { Component, Input } from '@angular/core';
import { ExerciseSet } from '../interfaces/exercise-set';

@Component({
  selector: 'app-entry-item',
  templateUrl: './entry-item.component.html',
  styleUrl: './entry-item.component.css'
})
export class EntryItemComponent {
  @Input('exercise-set') exerciseSet!: ExerciseSet;
 }
