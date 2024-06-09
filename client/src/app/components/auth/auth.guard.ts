// import { Router } from '@angular/router';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { AuthService } from '../../services/auth-service/auth.service';
//
// @Injectable()
// export class AuthGuard {
//   constructor(
//     private authService: AuthService,
//     private router: Router,
//   ) {}
//
//   canActivate():
//     | boolean
//     | Observable<boolean>
//     | Promise<boolean> {
//     const isAuth = this.authService.getIsAuth();
//     if (!isAuth) {
//       this.router.navigate(['/']);
//     }
//     return isAuth;
//   }
// }

import { inject } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';

export const AuthGuard = (): boolean => {
  const isAuth = inject(AuthService).getIsAuth();
  const router = inject(Router);

  if (!isAuth) {
    router.navigate(['/']);
  }
  return isAuth;
};
