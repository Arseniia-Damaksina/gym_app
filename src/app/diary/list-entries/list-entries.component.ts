import { Component, Input } from '@angular/core';
import { ExerciseSet, ExerciseSetList } from '../interfaces/exercise-set';

@Component({
  selector: 'app-list-entries',
  templateUrl: './list-entries.component.html',
  styleUrl: './list-entries.component.css'
})
export class ListEntriesComponent {
    @Input() exerciseList!: ExerciseSetList;

    itemTrackBy(index: number, item: ExerciseSet) {
      return item.id;
    }
}
