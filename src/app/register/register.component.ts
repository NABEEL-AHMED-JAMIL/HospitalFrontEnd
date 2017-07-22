import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService,DoctorTypeService,
        DoctorService,UtilService,
        RoleService } from '../_services/index';
import { DoctorType, Doctor, Role } from '../_models/index';


@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})


export class RegisterComponent implements OnInit{

    private loading:boolean = false;
    private image: String;
    private allDoctorType :Array<DoctorType>;
    //private roles: Array<Role> = [];
    private newDocterType: any = {} ;
    private newDocter: any = {};
    private dropdownList: any = [];
    private dropdownSettings: any = {};
    // 
    constructor(
        private router: Router,
        private doctorTypeService: DoctorTypeService,
        private alertService: AlertService,
        private doctorService:DoctorService,
        private utilService:UtilService, private roleService: RoleService) {

        }

    public ngOnInit(){
        this.image = this.utilService.getCircalImage();
        this.loadAllDoctorType();
        //this.laodAllRoll();
        this.dropdownList = [ {"id":1,"itemName":"ADMIN"},{"id":2,"itemName":"USER"},{"id":3,"itemName":"DBA"} ];
        this.dropdownSettings = { singleSelection: false, text:"Select Role's", selectAllText:'Select All',
                                  unSelectAllText:'UnSelect All', enableSearchFilter: true, classes:"myclass custom-class"
                                };            
    }


    public registerDoctor() {
        console.log(this.newDocter);
        this.loading = true;
        this.doctorService.create(this.newDocter)
            .subscribe( data => {
                console.log(data);
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/home']);
            },error => {        
                this.alertService.error("User Name Already Taken");
                this.loading = false;
            });
    }

    // ok method
    private loadAllDoctorType() { 
         this.doctorTypeService.getAllDoctorType().
           subscribe(allDoctorType => { 
             this.allDoctorType = allDoctorType.filter((item:any) => { return  !"ALL".match(item.type) ; });
            }, error => {}); 
    }

    // // ok method
    // private laodAllRoll() {
    //     this.roleService.getRole().subscribe( roles => {
    //         this.roles = roles;
    //     }, error => {});
    // }

    // ok method
    public registerDoctorType(){
        console.log("Event press");   
        console.log(this.newDocterType.dtype);
        this.doctorTypeService.createNewDoctorType(this.newDocterType.dtype)
            .subscribe( data => {
                 this.alertService.success('Successful New Type');
            }, error => {
                 this.alertService.error('Already Type Exist');
            });
    }

    // ok method
    public show:boolean = true; 
    public showhide(){
        if(this.show){
            this.show = false;
        }else{
            this.show = true;
        }
    }

        // (onSelect)="onItemSelect($event)" 
    //             (onDeSelect)="OnItemDeSelect($event)"
    //             (onSelectAll)="onSelectAll($event)"
    //             (onDeSelectAll)="onDeSelectAll($event)"
    // public onItemSelect(item:any): any{
    //     console.log(item);
    //     console.log(this.selectedItems);
    // }
    // public OnItemDeSelect(item:any): any{
    //     console.log(item);
    //     console.log(this.selectedItems);
    // }
    // public onSelectAll(items: any): any{
    //     console.log(items);
    // }
    // public onDeSelectAll(items: any): any{
    //     console.log(items);
    // }

}
