import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated() && authService.hasRole('ADMIN')) {
    return true;
  }

  // Rediriger vers la page de login ou d'accueil
  router.navigate(['/login']);
  return false;
};
