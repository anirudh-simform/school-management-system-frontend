import {
  ApplicationConfig,
  InjectionToken,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const BASE_URL = new InjectionToken<string>('BASE_URL');
export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: BASE_URL,
      useValue: 'http://localhost:8080',
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
