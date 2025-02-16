import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter } from '@angular/router';
import { Location } from '@angular/common';

import { DiaryComponent } from './diary.component';
import { ListEntriesComponent } from '../list-entries/list-entries.component';
import { NewItemButtonComponent } from '../new-item-button/new-item-button.component';
import { ExerciseSetsService } from '../services/exercise-sets.service';
import { of } from 'rxjs';
import { NewEntryFormReactiveComponent } from '../new-entry-form-reactive/new-entry-form-reactive.component';
import { ExerciseSet } from '../interfaces/exercise-set';

describe('DiaryComponent', () => {
  let component: DiaryComponent;
  let fixture: ComponentFixture<DiaryComponent>;
  let exerciseSetsService: ExerciseSetsService;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DiaryComponent,
        ListEntriesComponent,
        NewItemButtonComponent,
      ],
      providers: [
        provideRouter([
          {
            path: 'home/diary/entry/:id',
            component: NewEntryFormReactiveComponent,
          },
        ]),
        provideLocationMocks(),
        ExerciseSetsService,
        {
          provide: ExerciseSetsService,
          useValue: jasmine.createSpyObj('ExerciseSetsService', ['deleteItem']),
        },
      ],
    }).compileComponents();

    exerciseSetsService = TestBed.inject(ExerciseSetsService);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(DiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete method when the button delete is clicked', fakeAsync(() => {
    exerciseSetsService.deleteItem = jasmine.createSpy().and.returnValue(of());
    component.deleteItem('1');
    tick();

    expect(exerciseSetsService.deleteItem).toHaveBeenCalledWith('1');
  }));

  it('should call delete method when the button delete is clicked', fakeAsync(() => {
    exerciseSetsService.deleteItem = jasmine.createSpy().and.returnValue(of());
    component.deleteItem('1');
    tick();

    expect(exerciseSetsService.deleteItem).toHaveBeenCalledWith('1');
  }));

  it('should direct to diary entry edit route', fakeAsync(() => {
    const set: ExerciseSet = {
      date: new Date(),
      exercise: 'test',
      reps: 6,
      sets: 6,
      id: '1'
    };
    component.editEntry(set);
    tick();
    expect(location.path()).toBe('/home/diary/entry/1');
  }));
});
