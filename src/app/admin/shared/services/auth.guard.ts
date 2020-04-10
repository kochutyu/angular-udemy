import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authS: AuthService,
        private router: Router
    ) {
        
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.authS.isAuthenticated()) {
            return true
        } else {
            this.authS.logout();
            this.router.navigate(['/admin', 'login'], {
                queryParams: {
                    loginAgain: true,
                    lol: true
                }
            });
            return false
        }
    }
    

}
