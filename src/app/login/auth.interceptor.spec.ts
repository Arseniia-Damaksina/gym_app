import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AuthInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
    imports: [],
    providers: [AuthInterceptor, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
  );

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});