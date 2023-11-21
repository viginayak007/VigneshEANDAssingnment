import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const getCookie = cookieService.get('bearer');
  //TODO: check valid token token expired;
  if (getCookie) {
    return true
  }
  return false;
};
