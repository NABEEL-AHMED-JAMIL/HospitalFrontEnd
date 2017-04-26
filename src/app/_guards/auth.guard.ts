import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {SharedService } from '../_services/index';
// Service for Auth Gard to protect the page
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router , private _sharedService: SharedService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        console.log("this is call");
        this._sharedService.emitChange('End call');
        return false;
    }
}