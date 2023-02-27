import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  UrlSegment,
  Route,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isLoggedIn(state.url);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.isLoggedIn(segments.join('/'));
  }

  isLoggedIn(url: string): boolean {
    if (this.auth.isLoggedIn()) return true;

    this.auth.redirectUrl = url;
    this.router.navigate(['login'], {
      queryParams: { returnUrl: url },
    });
    return false;
  }
}
