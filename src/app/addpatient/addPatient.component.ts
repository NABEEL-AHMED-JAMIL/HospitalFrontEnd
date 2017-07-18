import { Component, OnInit } from '@angular/core';
//----------------Service------------------------------
import { UtilService  } from '../_services/index';
//-------------Routing---------------------------------
//-------------Model----------------------------------
//-------------Module----------------------------------
//------------Component--------------------------------

@Component({
    selector: 'add-Patient',
    templateUrl: 'addPatient.component.html',
    styleUrls: ['addPatient.component.css']
      
})


export class AddPatient implements OnInit {


    public image: String;
    
    constructor(private utilService: UtilService) { }

       
    ngOnInit() {
        this.image = this.utilService.getCircalImage();
    }
    
}
