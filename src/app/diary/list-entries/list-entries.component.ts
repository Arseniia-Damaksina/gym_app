import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ExerciseSet, ExerciseSetList } from '../interfaces/exercise-set';
import { ExerciseSetsService } from '../services/exercise-sets.service';

@Component({
  selector: 'app-list-entries',
  templateUrl: './list-entries.component.html',
  styleUrl: './list-entries.component.css'
})
export class ListEntriesComponent {
    @Input() exerciseList!: ExerciseSetList;
    @Output() newRepEvent = new EventEmitter<ExerciseSet>();
    @Output() deleteEvent = new EventEmitter<string>();

    itemTrackBy(index: number, item: ExerciseSet) {
      return item.id;
    }
}
