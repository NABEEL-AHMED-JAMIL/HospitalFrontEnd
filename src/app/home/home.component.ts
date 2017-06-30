import { Component, OnInit , Input } from '@angular/core';

import { Docter } from '../_models/index';
import { DocterService,SharedService } from '../_services/index';
import {PatientService} from '../_services/index';
import { Router } from '@angular/router';
import { DialogService } from "ng2-bootstrap-modal";
import { CDialogComponent } from '../_dialog_box/index';


@Component({
    selector: 'home',  
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})


export class HomeComponent  implements OnInit {
    // table configuration 
   public page:number = 1;
   public itemsPerPage:number = 10;
   public maxSize:number = 5;
   public numPages:number = 1;
   public length:number = 0;
   public rows:Array<any> = [];
   public columns:Array<any> = [
      {title: 'MR #' , name: 'mrNo'},
      {title: 'Name' , name: 'name'}, 
      {title:'Phone' , name:'phone'},
    ];
   // database data
   public data:Array<any>;
   public config:any = {
       paging: true,
       sorting: {columns: this.columns},
       filtering: {filterString: ''},
       className: ['table-striped', , 'table-bordered' ]
    };
    
    // first get the hero list and put into the obserable method
    private currentDocter: Docter;
    
    constructor(private _sharedService: SharedService ,private dialogService:DialogService, private docterService: DocterService ,
        private patientService : PatientService ,private router: Router) {
        this.currentDocter = JSON.parse(localStorage.getItem('currentUser'));
    }


   // this is onit method
   public ngOnInit():void {
       this.loadAllPatient();
       this._sharedService.emitChange("Data from child");
  }

  private loadAllPatient() { 
      this.patientService.getAllPatient().
        subscribe(patients => { 
            this.data = patients;
            if(this.data.length == 0){
                this.length = 0;
            }else {
                this.length = this.data.length;
            }
            this.onChangeTable(this.config);
        });
  }

  public changePage(page:any, data:Array<any> = this.data): Array<any> {
      
      let start = (page.page - 1) * page.itemsPerPage;
      let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage): data.length;
      
      return data.slice(start, end);
   }

  // this is the whole structrure of the table that change by(sorting , filtering)
  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}) :any {
      if (config.filtering) {
          Object.assign(this.config.filtering, config.filtering);
       }
       
      if (config.sorting) {
          Object.assign(this.config.sorting, config.sorting);
       }
       
      let filteredData = this.changeFilter(this.data, this.config);
      let sortedData = this.changeSort(filteredData, this.config);
      this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
      this.length = sortedData.length;

  }

// this is the filter that filter the data in the table
  public changeFilter(data:any, config:any):any {
      let filteredData:Array<any> = data;
      this.columns.forEach((column:any) => {
          
          if (column.filtering) {
              filteredData = filteredData.filter( (item:any) => {
                  return item[column.name].match(column.filtering.filterString);
              });
          }
      });
      
      if (!config.filtering) {
          return filteredData;
      }
      
      if (config.filtering.columnName) {
          return filteredData.filter((item:any) => {
              item[config.filtering.columnName].match(this.config.filtering.filterString)});
    }
    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
        let flag = false;
        this.columns.forEach((column:any) => {
            if (item[column.name].toString().match(this.config.filtering.filterString)) {        
                flag = true;
            }
            if (column.name == "name") {
                if (item[column.name].toLowerCase().toString().match(this.config.filtering.filterString)) {        
                    flag = true;
                }
            }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }
  temp:any;
  
  // this is the sort the change the data table
  public changeSort(data:any, config:any):any {
     
      if (!config.sorting) {
          return data;
      }
      
      let columns = this.config.sorting.columns || [];
      let columnName:string = void 0;
      let sort:string = void 0;
      
      for (let i = 0; i < columns.length; i++) {
          if (columns[i].sort !== '' && columns[i].sort !== false) {
              columnName = columns[i].name;
              sort = columns[i].sort;
          }
      }
      
      if (!columnName) {
          return data;
      }
      
      // simple sorting
      return data.sort((previous:any, current:any) => {
          if (previous[columnName] > current[columnName]) {
              return sort === 'desc' ? -1 : 1;
          } else if (previous[columnName] < current[columnName]) {
              return sort === 'asc' ? -1 : 1;
        }
        
        return 0;
    });
  }
  
  // this is event on the cell Click
  public onCellClick(data: any): any {   
    
    this.dialogService.addDialog(CDialogComponent, {
        title:'Patient Operation',
        message:"Pakistan zinda.........."
    }).subscribe((isConfirmed :any)=> {
        if(isConfirmed == "view"){  
            this.router.navigate(['/addnote', data.row.mrNo]);
        }else if (isConfirmed == "edit"){
        }else if(isConfirmed == "delete"){
            this.patientService.deletePatient(data.row.mrNo).subscribe(data => {});
            //location.reload();
            // configuer again
            let index: number = this.data.indexOf(data.row);

            if (index !== -1) {
                this.data.splice(index, 1);
            } 
           this.onChangeTable(this.config);

        }else if(isConfirmed == "cancel") {}
    });
  }
  
}