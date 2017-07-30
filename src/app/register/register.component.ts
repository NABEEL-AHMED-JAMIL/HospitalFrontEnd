import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, DoctorTypeService, DoctorService,
    UtilService, RoleService } from '../_services/index';
import { DoctorType, DoctorDTO , Role } from '../_models/index';


@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})


export class RegisterComponent implements OnInit{

    private loading: Boolean = false;
    private image: String;
    private allDoctorType: Array<DoctorType>;
    private newDocterType: any = {} ;
    public newDocter: DoctorDTO;
    public show: Boolean = true;
    // dropdown list
    private dropdownList: any = [ {'id': 1, 'itemName': 'ADMIN'}, {'id': 2, 'itemName': 'USER'}, {'id': 3, 'itemName': 'DBA'} ];

    private dropdownSettings: any = {
        singleSelection: false,
        text: 'Select Role`s',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        enableSearchFilter: true,
        classes: 'myclass custom-class'
    };

    constructor(private router: Router, private doctorTypeService: DoctorTypeService, private alertService: AlertService,
        private doctorService: DoctorService, private utilService: UtilService, private roleService: RoleService) {}

    ngOnInit() {
        this.image = this.utilService.getCircalImage();
        this.loadAllDoctorType();
        this.newDocter = {
            email: null, username: null, password: null, confirmPassword: null,
            firstname: null, lastname: null, gender: null, active: true,
            roles: [{'id': 1, 'itemName': 'ADMIN'}], doctorType: 2 };
        console.log(this.newDocterType);
    }

    private registerDoctor(newDocter: DoctorDTO, isValid: boolean) {
        if (isValid) {
            console.log(newDocter);
            this.loading = true;
            this.doctorService.create(newDocter).subscribe( data => {
                console.log(data);
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/home']);
            }, error => {
                this.alertService.error('User Name Already Taken');
                this.loading = false;
            });
        }else {
              this.alertService.error('Some Info Missing');
        }
    }

    private loadAllDoctorType() {
         this.doctorTypeService.getAllDoctorType().subscribe(
            data => {
               this.allDoctorType = data.filter((item: any) => { return  !'ALL'.match(item.type);
            });
            }, error => {});
    }

    public showhide() {
        if (this.show) {
            this.show = false;
        }else {
            this.show = true;
        }
    }

    public registerDoctorType() {
        this.doctorTypeService.createNewDoctorType(this.newDocterType.dtype).subscribe(
            data => {
                console.log(data);
                this.alertService.success('Successful New Doctor Type');
            }, error => {
                 this.alertService.error('Already Exist');
            });
    }
}
