import { CanActivateFn, Router, RedirectCommand } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStatusService } from './auth-status.service';
import { HttpService } from './http.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthStatusService);
  const router = inject(Router);
  const http = inject(HttpService);
  const url = state.url;
  return http.authCheck().pipe(
    map((data) => {
      authService.loginStatus.set(true);
      authService.userRole.set(data.role);
      return true;
    }),
    catchError((err) => {
      authService.loginStatus.set(false);
      return of(new RedirectCommand(router.parseUrl('autherror')));
    })
  );
};
