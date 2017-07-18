import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService,DoctorTypeService,DoctorService, UtilService} from '../_services/index';
import { DoctorType, Doctor, Role } from '../_models/index';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';


@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})


export class RegisterComponent implements OnInit{

    private image: String;
    doctor: any = {};
    newDoctorType: any = {};
    private doctorType: DoctorType;
    loading = false;
    private allDoctorType :Array<DoctorType>;
    optionsModel: number[];
    myOptions: IMultiSelectOption[];
    


    constructor(
        private router: Router,
        private doctorTypeService: DoctorTypeService,
        private alertService: AlertService,
        private doctorService:DoctorService,
        private utilService:UtilService) {  }

    public ngOnInit():void {
        this.image = this.utilService.getCircalImage();
        this.myOptions = [
            { id: 1, name: 'Option 1' },
            { id: 2, name: 'Option 2' },
        ];
        this.loadAllDoctorType();
    }

    onChange() {
        console.log(this.optionsModel);
    }
    
    private loadAllDoctorType() { 
         this.doctorTypeService.getAllDoctorType().
           subscribe(allDoctorType => { 
             this.allDoctorType = allDoctorType.filter((item:any) => { return  !"ALL".match(item.type) ; });
             console.log(this.allDoctorType);
            });
        
    }

    public registerDoctor() {
        console.log(JSON.stringify(this.doctor));
        this.loading = true;
        this.doctorService.create(this.doctor)
            .subscribe( data => {
                console.log(data);
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            },
            error => {        
                this.alertService.error("User Name Already Taken");
                this.loading = false;
            });
    }

    public registerDoctorType(){
        
    }

}
