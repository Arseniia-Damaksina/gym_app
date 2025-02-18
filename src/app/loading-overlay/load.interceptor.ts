import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoadService } from './load.service';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class LoadInterceptor implements HttpInterceptor {
  private loadService = inject(LoadService);

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (req.headers.get('X-LOADING') === 'false') {
      return next.handle(req);
    }

    this.loadService.showLoader();

    return next.handle(req).pipe(finalize(() => this.loadService.hideLoader()));
  }
}
