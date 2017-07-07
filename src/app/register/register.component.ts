import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService,DocterTypeService,DocterService} from '../_services/index';
import {MultiSelectModule} from 'primeng/primeng';




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
     options = [
         {id: 1, name:'OptionA', value:'1', checked:true},
         {id: 1,name:'OptionB', value:'2', checked:false},
         {id: 1,name:'OptionC', value:'3', checked:true}
         ]
    public genders = [
    { value: 'F', display: 'Female' },
    { value: 'M', display: 'Male' }
  ];

  public topics = [
    { value: 'game', display: 'Gaming' },
    { value: 'tech', display: 'Technology' },
    { value: 'life', display: 'Lifestyle' },
  ];



  get selectedOptions() { // right now: ['1','3']
    return this.options
              .filter(opt => opt.checked)
              .map(opt => opt.value)
  }
types = [{id: 1, role:'Really Smart'}, {id: 2, role:'Super Flexible'},
        {id: 3, role:'Super Hot'}, {id: 4, role:'Weather Changer'},
             ];
    
    constructor(
        private router: Router,
        private docterTypeService: DocterTypeService,
        private alertService: AlertService,
        private userService:DocterService) {  }

    public ngOnInit():void {
        
        this.loadAllDoctorType();
    }
    
    private loadAllDoctorType() { 
        this.docterTypeService.getAllDoctorType()
            .subscribe(allDoctorType => { 
                this.allDoctorType = allDoctorType;
                console.log(this.allDoctorType);   
        });
    }

    public register() {
        console.log(JSON.stringify(this.model));
        this.loading = true;
        this.userService.create(this.model)
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

}
