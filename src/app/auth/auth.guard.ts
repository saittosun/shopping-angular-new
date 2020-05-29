import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot, router: RouterStateSnapshot
  ): boolean |
     UrlTree |
     Promise<boolean | UrlTree> |
     Observable<boolean | UrlTree> {
    // tslint:disable-next-line:max-line-length
    // we can find out whether the user is authenticated or not by looking at that user behavior subject. don't subscribe here but return it instead because this already is an observable, it's a subject and therefore also an observable, however not an observable that returns a boolean, instead it is an observable that in the end returns a user object but this can be fixed easily, we just add pipe and use the map operator which is imported from rxjs/operators to transform the observable value here. So we get our user and we want to return true or false, so we can simply return !!user which is that trick which converts a true-ish value, like an object, so anything that is not null or undefined, to true, so to a real boolean or that converts false-ish value like null or undefined to a true boolean, so to false in this case. So now we have an observable that really will return true or false and that should allow us to use that activate guard in front of the routes that we want to protect.
    return this.authService.user.pipe(
      // tslint:disable-next-line:max-line-length
      // we should use take one to make sure that we always just take the latest user value and then unsubscribe for this guard execution so that we don't have an ongoing listener to that which we really don't need
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['auth']);
      })
    );
  }
}
