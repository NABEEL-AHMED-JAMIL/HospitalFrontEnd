import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {SharedService, AlertService, AuthenticationService,NoteService  } from '../_services/index';
import { AppComponent } from "../app.component";
import { Docter } from "../_models/index";


@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
      
})

export class LoginComponent implements OnInit {

    model: any = {};
    loading = false;
    returnUrl: string;
    
    constructor(
        private _sharedService: SharedService,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private appComponent: AppComponent
       ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        
        this.authenticationService.login(this.model)
            .subscribe(
                data => {
                    this._sharedService.emitChange('Data from child');
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error("Wrong Password And User Name");
                    this.loading = false;
                });
    }

    

}
