import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpEventType, HttpStatusCode, withInterceptors } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { provideState, provideStore } from '@ngrx/store';
import { userReducer } from './reducers/user.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([loggingInterceptor, httpInterceptor, responseInterceptor])),
    ApiService,
    provideStore(),
    provideState({ name: 'user', reducer: userReducer })
  ]
};

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log(req.url);
  return next(req);
}

export function httpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const clonedRequest = req.clone({
    withCredentials: true, // Ensures cookies are sent with the request
  });
  return next(clonedRequest);
}

export function responseInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const router : Router = inject(Router);
  
  return next(req).pipe(tap((event) => {
    if (event.type === HttpEventType.Response) {
      console.log(req.url, 'returned a response with status', event.status);
      if([HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden].includes(event.status)) {
        router.navigate(['access-denied'])
      }
    }
  }, (error) => {
    if (error.status === HttpStatusCode.Unauthorized || error.status === HttpStatusCode.Forbidden) {
      router.navigate(['access-denied']);
    }
  }));
}