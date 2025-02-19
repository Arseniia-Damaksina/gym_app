import { Component, inject, OnInit } from '@angular/core';
import { ExerciseSet, ExerciseSetList } from '../interfaces/exercise-set';
import { ExerciseSetsService } from '../services/exercise-sets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListEntriesComponent } from '../list-entries/list-entries.component';
import { NewItemButtonComponent } from '../new-item-button/new-item-button.component';

@Component({
  standalone: true,
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.css',
  imports: [ListEntriesComponent, NewItemButtonComponent]
})
export class DiaryComponent implements OnInit {
  private exerciseSetsService = inject(ExerciseSetsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  exerciseList!: ExerciseSetList;

  ngOnInit(): void {
    this.route.data.subscribe(({ exerciseList }) => {
      this.exerciseList = exerciseList;
    });
  }

  newList() {
    this.exerciseSetsService
      .refreshList()
      .subscribe((exerciseList) => (this.exerciseList = exerciseList));
  }

  addExercise(newSet: ExerciseSet) {
    // this.router.navigate(['/home/new-template']);
    this.router.navigate(['/home/diary/entry']);
  }

  deleteItem(id: string) {
    this.exerciseSetsService.deleteItem(id).subscribe();
  }

  editEntry(updateSet: ExerciseSet) {
    const id = updateSet.id ?? '';
    this.router.navigate([`/home/diary/entry/${id}`]);
  }
}
