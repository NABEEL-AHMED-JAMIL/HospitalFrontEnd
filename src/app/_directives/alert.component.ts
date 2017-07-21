import { Component, OnInit } from '@angular/core';
//----------------Service------------------------------
import { AlertService } from '../_services/index';



@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html'
})


export class AlertComponent {

    
    public message: any;
    
    constructor(private alertService: AlertService) { }
     
    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
    
}