import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEntryFormTemplateComponent } from './new-entry-form-template.component';
import { FormsModule } from '@angular/forms';
import { ExerciseSetsService } from '../services/exercise-sets.service';

describe('NewEntryFormTemplateComponent', () => {
  let component: NewEntryFormTemplateComponent;
  let fixture: ComponentFixture<NewEntryFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewEntryFormTemplateComponent],
      imports: [FormsModule],
      providers: [
        ExerciseSetsService,
        {
          provide: ExerciseSetsService,
          useValue: jasmine.createSpyObj('ExerciseSetsService', ['addNewItem']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewEntryFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
