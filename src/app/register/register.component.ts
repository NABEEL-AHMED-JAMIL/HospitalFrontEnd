import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, DocterTypeService ,DocterService} from '../_services/index';

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent implements OnInit{
    model: any = {};
    loading = false;
    private allDoctorType :Array<any>;
    constructor(
        private router: Router,
        private docterTypeService: DocterTypeService,
        private alertService: AlertService,
        private userService:DocterService) { }

    public ngOnInit():void {
        this.loadAllDoctorType();
    }

     private loadAllDoctorType() { 

        this.docterTypeService.getAllDoctorType().subscribe(allDoctorType => { this.allDoctorType = allDoctorType;
            console.log(this.allDoctorType);   

        });
    }

    

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
