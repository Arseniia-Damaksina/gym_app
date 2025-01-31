import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.token;

    if (req.url.includes('auth')) {
      return next.handle(req);
    }

    if (token) {
      const reqAuth = req.clone({
        headers: req.headers.set(`Authorization`, `Bearer ${token}`),
      });
      return next.handle(reqAuth);
    }
    return next.handle(req);
  }
}
