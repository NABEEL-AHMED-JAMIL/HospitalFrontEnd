import { Component, OnInit } from '@angular/core';
// ---------------Service------------------------------
import { PatientService } from '../_services/index';
import { DialogService } from 'ng2-bootstrap-modal';
// ------------Routing---------------------------------
import { Router } from '@angular/router';
// -----------Component--------------------------------
import { CDialogComponent } from '../_dialog_box/index';


@Component({
    moduleId:  module.id,
    selector:  'app-home',
    templateUrl:  'home.component.html',
    styleUrls:  ['home.component.css']
})


export class HomeComponent  implements OnInit {
    // table configuration
    public page: Number = 1;
    public itemsPerPage: Number = 10;
    public maxSize: Number = 5;
    public numPages: Number = 1;
    public length: Number = 0;
    public rows: Array<any> = [];
    public columns: Array<any> = [
        {title:  'MR #' , name:  'mrNo'},
        {title:  'Name' , name:  'name'},
        {title: 'Phone' , name: 'phone'},
        {title: 'Age' , name: 'age'},
    ];
   // database data
   // convert this data to patients
   public patients: Array<any>;
   public config: any = {
       paging:  true,
       sorting:  {columns:  this.columns},
       filtering:  {filterString:  ''},
       className:  ['table-striped', , 'table-bordered' ]
    };

    constructor(private dialogService:  DialogService,private patientService:  PatientService,
                private router:  Router) {}


   // this is onit method
   public ngOnInit(): void {
       this.loadAllPatient();
    }

    private loadAllPatient() {
        this.patientService.getAllPatient()
            .subscribe(patients => {
                this.patients = patients;
                if (this.patients.length === 0) {
                    this.length = 0;
                }else {
                    this.length = this.patients.length;
                }
                this.onChangeTable(this.config);
            });
    }

    // this is the whole structrure of the table that change by(sorting , filtering)
    public onChangeTable(config: any, page: any = {page:  this.page, itemsPerPage:  this.itemsPerPage}) : any {
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }
        const filteredData = this.changeFilter(this.patients, this.config);
        const sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) :  sortedData;
        this.length = sortedData.length;
    }

    public changePage(page: any, data: Array<any> = this.patients):  Array<any> {
        const start = (page.page - 1) * page.itemsPerPage;
        const end = page.itemsPerPage > -1 ? (start  +  page.itemsPerPage) : data.length;
        return data.slice(start, end);
    }

    // this is the filter that filter the data in the table
    public changeFilter(data: any, config: any): any {
        let filteredData: Array<any> = data;
        this.columns.forEach((column: any) => {
            if (column.filtering) {
                filteredData = filteredData.filter((item: any) => {
                    return item[column.name].match(column.filtering.filterString);
                });
            }
        });
        if (!config.filtering) {
            return filteredData;
        }

        if (config.filtering.columnName) {
            return filteredData.filter((item: any) => {
                item[config.filtering.columnName].match(this.config.filtering.filterString)
            });
        }
        const tempArray: Array<any> = [];
        filteredData.forEach((item: any) => {
            let flag = false;
            this.columns.forEach((column: any) => {
                if (item[column.name] != null){
                    if (item[column.name].toString().match(this.config.filtering.filterString)) {
                        flag = true;
                    }
                    if (column.name === 'name') {
                        if (item[column.name].toLowerCase().toString().match(this.config.filtering.filterString)) {
                            flag = true;
                        }
                    }
                }else{
                    item[column.name] = '--------------';
                    flag = true;
                }
            });
            if (flag) {
                tempArray.push(item);
            }
        });
        filteredData = tempArray;
        return filteredData;
    }

    // this is the sort the change the data table
    public changeSort(data: any, config: any): any {
        if (!config.sorting) {
            return data;
        }
        const columns = this.config.sorting.columns || [];
        let columnName: string = void 0;
        let sort: string = void 0;
        for (let i = 0; i < columns.length; i++ ) {
            if (columns[i].sort !== '' && columns[i].sort !== false) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }
        if (!columnName) {
            return data;
        }
        // simple sorting
        return data.sort((previous: any, current: any) => {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 :  1;
            } else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 :  1;
            }
            return 0;
        });
  }

  // this is event on the cell Click
  public onCellClick(data:  any):  any {
      this.dialogService.addDialog(CDialogComponent, {
          title: 'Patient Operation',
          message:  'Mr#: ' + data.row.mrNo + ' ||  Name : ' + data.row.name })
          .subscribe((isConfirmed: any) => {
              if (isConfirmed === 'view') {
                 this.router.navigate(['/app-add-note', data.row.mrNo]);
               }else if (isConfirmed === 'edit') {

               }else if (isConfirmed === 'delete') {
                this.patientService.deletePatient(data.row.mrNo).subscribe( data => {});
                const index:  number = this.patients.indexOf(data.row);
                if (index !== -1) {
                    this.patients.splice(index, 1);
                }
                this.onChangeTable(this.config);
            }else if (isConfirmed === 'cancel') {}
        });
    }

}
