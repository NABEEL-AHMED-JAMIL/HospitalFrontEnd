import { Injectable } from '@angular/core';
// ----------------Service------------------------------
import {SharedService } from '../_services/index';
// -------------Routing---------------------------------
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private sharedService: SharedService) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        if (localStorage.getItem('currentUser')) {
            this.sharedService.emitChange(true);
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }

}