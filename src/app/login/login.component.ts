import { Component, OnInit } from '@angular/core';
//----------------Service------------------------------
import {SharedService, AlertService, AuthenticationService, UtilService  } from '../_services/index';
//-------------Routing---------------------------------
import { Router, ActivatedRoute } from '@angular/router';
//-------------Model----------------------------------
//-------------Module----------------------------------
//------------Component--------------------------------
import { AppComponent } from "../app.component";


@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
      
})


export class LoginComponent implements OnInit {

    public model: any = {};
    public loading = false;
    public image: String;
    public returnUrl: string;

    
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _sharedService: SharedService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private utilService: UtilService
       ) { }


    ngOnInit() {
        this.image = this.utilService.getCircalImage();
        console.log(this.image);
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    
    public login() {

         this.loading = true;
         this.authenticationService.login(this.model)
            .subscribe(
                data => {
                    // open the gate for show the entriy
                    this._sharedService.statusEmitChange(true);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error("Wrong Password And User Name");
                    this.loading = false;
                });
     }
}
