import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class TelemetryInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (req.headers.get('X-TELEMETRY') !== 'true') {
      return next.handle(req);
    }

    const started = Date.now();
    return next.handle(req).pipe(
      finalize(() => {
        const elapsed = Date.now() - started;
        const message = `${req.method} "${req.urlWithParams}" in ${elapsed} ms.`;
        console.log(message);
      })
    );
  }
}
