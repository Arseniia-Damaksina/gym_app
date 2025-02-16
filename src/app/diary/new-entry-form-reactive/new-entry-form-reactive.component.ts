import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ExerciseSetsService } from '../services/exercise-sets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { multipleValidator } from './custom-validation';
import { ExerciseSet } from '../interfaces/exercise-set';
import { formatDate } from '../../utils/formatDate';
import { ExercisesService } from '../services/exercises.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';

const DEBOUNCE_TIME = 300;

@Component({
  selector: 'app-new-entry-form-reactive',
  templateUrl: './new-entry-form-reactive.component.html',
  styleUrl: './new-entry-form-reactive.component.css',
})
export class NewEntryFormReactiveComponent implements OnInit {
  @Input('id') entryId?: string;
  private formBuilder = inject(NonNullableFormBuilder);
  private exerciseSetsService = inject(ExerciseSetsService);
  private exerciseService = inject(ExercisesService);
  public showSuggestions: boolean = false;
  // public exercises$ = this.exerciseService.getExercises();
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public entryForm = this.formBuilder.group({
    date: [new Date(), Validators.required],
    exercise: ['', Validators.required],
    sets: [0, [Validators.required, Validators.min(0), multipleValidator(2)]],
    reps: [0, [Validators.required, Validators.min(0), multipleValidator(3)]],
  });

  public exercises$ = this.entryForm.valueChanges.pipe(
    debounceTime(DEBOUNCE_TIME),
    map((model) => model?.exercise ?? ''),
    filter((exercise) => exercise.length >= 3),
    distinctUntilChanged(),
    switchMap((exercise) => this.exerciseService.getExercises(exercise))
  );

  ngOnInit(): void {
    // this.entryId = this.route.snapshot.paramMap.get('id');
    if (this.entryId) {
      this.route.data.subscribe(({ entry }) => {
        this.updateForm(entry);
      });
    }
  }

  selectExercise(suggestion: string) {
    this.entryForm.get('exercise')?.setValue(suggestion);
    this.toggleSuggestions(false);
  }

  toggleSuggestions(turnOn: boolean) {
    this.showSuggestions = turnOn;
  }

  updateForm(entry: ExerciseSet): void {
    let { id: _, ...entryForm } = entry;
    this.entryForm.setValue(entryForm);
  }

  newEntry() {
    if (this.entryForm.valid) {
      const newEntry = { ...this.entryForm.value };

      if (this.entryId) {
        this.exerciseSetsService
          .updateItem(this.entryId, newEntry)
          .subscribe((entry) => this.router.navigate(['/home']));
      } else {
        this.exerciseSetsService
          .addNewItem(newEntry)
          .subscribe((entry) => this.router.navigate(['/home']));
      }
    }
  }
}
