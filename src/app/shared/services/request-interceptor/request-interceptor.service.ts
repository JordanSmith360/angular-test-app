import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoggingServiceService } from '../logging-service/logging-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestInterceptorService implements HttpInterceptor {
  constructor(private logger: LoggingServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = req.clone({ url: `${environment.url}${req.url}` });
    this.logger.logWarning(modifiedRequest);
    return next.handle(modifiedRequest);
  }
}

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptorService,
    multi: true,
  },
];
