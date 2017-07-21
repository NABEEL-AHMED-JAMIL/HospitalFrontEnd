import { Component, OnInit } from '@angular/core';
//----------------Service------------------------------
import { UtilService, PatientService, AlertService  } from '../_services/index';
import { DialogService } from "ng2-bootstrap-modal";
//-------------Routing---------------------------------
import { Router } from '@angular/router';
//------------Component--------------------------------
import { CDialogComponent } from '../_dialog_box/index';

@Component({
    selector: 'add-Patient',
    templateUrl: 'addPatient.component.html'
      
})


export class AddPatient implements OnInit {
    public model:any = {};
    public image: String;
    public loadinglogin = false;

    constructor(private utilService: UtilService, 
        private patientService: PatientService, 
        private alertService: AlertService,
        private dialogService: DialogService,private router: Router) { }

       
    ngOnInit() {
        this.image = this.utilService.getCircalImage();
    }
    
    
    private register(): any{
        this.loadinglogin = true;
        this.patientService.newPatient(this.model)
            .subscribe(
                data => {
                    // on success show the dialog box
                    console.log("data "+JSON.stringify(data));
                    this.loadinglogin = false;
                       this.dialogService.addDialog(CDialogComponent, {
                           title:'Add New Patient Notes',
                           message:"Pakistan zinda.........."
                        }).subscribe((isConfirmed :any)=> {
                            if(isConfirmed == "newNote") {
                                // add the paitent id
                                this.router.navigate(['/addnote', null]);
                            }else if(isConfirmed == "delete"){
                                // delte the paitent by id
                                // and back to the home page
                                this.router.navigate(['/home']);
                            }else if (isConfirmed == "cancel") {
                                // go to home page
                                this.router.navigate(['/home']);
                            }
                    });
                },
                error => {
                    console.log("error "+error);
                    this.alertService.error("Error Creating the Patient");
                    this.loadinglogin = false;
                });
    }
    
}
