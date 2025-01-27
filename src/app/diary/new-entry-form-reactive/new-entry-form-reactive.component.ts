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

@Component({
  selector: 'app-new-entry-form-reactive',
  templateUrl: './new-entry-form-reactive.component.html',
  styleUrl: './new-entry-form-reactive.component.css',
})
export class NewEntryFormReactiveComponent implements OnInit {
  @Input('id') entryId?: string;
  public entryForm!: FormGroup;
  private formBuilder = inject(NonNullableFormBuilder);
  private exerciseSetsService = inject(ExerciseSetsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // this.entryId = this.route.snapshot.paramMap.get('id');
    if (this.entryId) {
      this.route.data.subscribe(({entry}) => {
        this.updateForm(entry);
      })
    }

    this.entryForm = this.formBuilder.group({
      date: [new Date(), Validators.required],
      exercise: ['', Validators.required],
      sets: [
        '',
        [Validators.required, Validators.min(0), multipleValidator(2)],
      ],
      reps: [
        '',
        [Validators.required, Validators.min(0), multipleValidator(3)],
      ],
    });
  }

  updateForm(entry: ExerciseSet): void {
    let { id: _, ...entryForm } = entry;
    const formattedEntry = {
      ...entryForm,
      date: formatDate(entry.date),
    };
    this.entryForm.setValue(formattedEntry);
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
