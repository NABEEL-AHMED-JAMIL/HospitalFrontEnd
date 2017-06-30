import { Injectable } from '@angular/core';
//----------------Service------------------------------
import {SharedService } from '../_services/index';
//-------------Routing---------------------------------
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//-------------Model----------------------------------
//-------------Module----------------------------------
//------------Component--------------------------------


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router , private _sharedService: SharedService) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        // , { queryParams: { returnUrl: state.url }}
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        this._sharedService.emitChange('End call');
        return false;
    }
}