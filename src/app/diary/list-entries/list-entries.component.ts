import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ExerciseSet, ExerciseSetList } from '../interfaces/exercise-set';
import { ExerciseSetsService } from '../services/exercise-sets.service';
import { EntryItemComponent } from '../entry-item/entry-item.component';

@Component({
  standalone: true,
  selector: 'app-list-entries',
  templateUrl: './list-entries.component.html',
  styleUrl: './list-entries.component.css',
  imports: [EntryItemComponent]
})
export class ListEntriesComponent {
    // @Input() exerciseList!: ExerciseSetList;
    @Output() editEvent = new EventEmitter<ExerciseSet>();
    @Output() deleteEvent = new EventEmitter<string>();

    private exerciseSetsService = inject(ExerciseSetsService);
    exerciseList = this.exerciseSetsService.exerciseList;

    itemTrackBy(index: number, item: ExerciseSet) {
      return item.id;
    }
}
