import { Component, OnInit } from '@angular/core';
// ----------------Service------------------------------
import { UtilService, PatientService, AlertService  } from '../_services/index';
import { DialogService } from 'ng2-bootstrap-modal';
// -------------Routing---------------------------------
import { Router } from '@angular/router';
// ------------Component--------------------------------
import { CDialogComponent } from '../_dialog_box/index';
// ------------Patient-----------------------------------
import { Patient } from '../_models/patient';

@Component({

    selector: 'app-add-patient',
    templateUrl: 'addPatient.component.html'

})


export class AddPatient implements OnInit {

    public model: any = {};
    public image: String;
    public loadinglogin = false;
    public patient: Patient;

    constructor(private utilService: UtilService, private patientService: PatientService,
        private alertService: AlertService, private dialogService: DialogService,
        private router: Router) { }

    ngOnInit() {
        this.image = this.utilService.getCircalImage();
    }

    private register(): any{
        this.loadinglogin = true;
        this.patientService.newPatient(this.model)
            .subscribe( data => {
                this.patient = data.json();
                this.loadinglogin = false;
                this.dialogService.addDialog( CDialogComponent, {
                    title: 'Add New Patient Notes',
                     message: 'Mr# : ' + this.patient.mrNo + ' ||  Name : ' + this.patient.name,
                }).subscribe((isConfirmed: any) => {
                   if (isConfirmed === 'newNote') {
                         this.router.navigate(['/addnote/', this.patient.mrNo]);
                    }else if (isConfirmed === 'delete') {
                        this.patientService.deletePatient(this.patient.mrNo)
                            .subscribe( data => {
                                this.router.navigate(['/home']); },
                                error => { this.router.navigate(['/home']);}
                            );
                    }else if (isConfirmed === 'cancel') {
                        this.router.navigate(['/home']);
                    }
                });
            }, error => {
                this.alertService.error('Error Creating the Patient');
                this.loadinglogin = false;
        });
    }

}
