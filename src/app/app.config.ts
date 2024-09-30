import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { httpInterceptorProviders } from './shared/services/request-interceptor/request-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), httpInterceptorProviders],
};
