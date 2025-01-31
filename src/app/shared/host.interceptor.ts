import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HostInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = 'http://localhost:3000';
    const resource = req.url;

    if(req.url.includes('http')) {
      return next.handle(req);
    }

    const urlsReq = req.clone({
      url: `${url}/${resource}`
    });
    return next.handle(urlsReq);
  }
}