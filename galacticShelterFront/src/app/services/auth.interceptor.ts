import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const credentials = authService.getAuthCredentials();

  if (credentials && !req.headers.has('Authorization')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Basic ${credentials}`
      }
    });
  }

  return next(req);
};
