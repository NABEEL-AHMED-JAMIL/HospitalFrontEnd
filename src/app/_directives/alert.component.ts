import { Component, OnInit } from '@angular/core';
import { AlertService } from '../_services/index';


@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.css']
})


export class AlertComponent {
    // this message show the alert for log_in (true: message => login Success , false: message => login Fail);
    public message: any;
    
    constructor(private alertService: AlertService) { }
     
    ngOnInit() {
        this.alertService.getMessage().
            subscribe(message => { 
                this.message = message;
            });
    }

}