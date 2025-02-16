import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AuthService } from '../login/auth.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterModule.forRoot([])],
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        AuthService,
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['logout']),
        },
      ],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
