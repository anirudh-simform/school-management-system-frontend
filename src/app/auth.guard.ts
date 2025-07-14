import { CanActivateFn, Router, RedirectCommand } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStatusService } from './auth-status.service';

import { catchError, map, of } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthStatusService);
  const router = inject(Router);
  const http = inject(AuthService);
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
