import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter } from '@angular/router';

import { NewEntryFormReactiveComponent } from './new-entry-form-reactive.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExerciseSetsService } from '../services/exercise-sets.service';
import { ExercisesService } from '../services/exercises.service';

describe('NewEntryFormReactiveComponent', () => {
  let component: NewEntryFormReactiveComponent;
  let fixture: ComponentFixture<NewEntryFormReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewEntryFormReactiveComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        ExerciseSetsService,
        {
          provide: ExerciseSetsService,
          useValue: jasmine.createSpyObj('ExerciseSetsService', [
            'addNewItem',
            'updateItem',
          ]),
        },
        ExercisesService,
        {
          provide: ExercisesService,
          useValue: jasmine.createSpyObj('ExercisesService', ['getExercises']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewEntryFormReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
