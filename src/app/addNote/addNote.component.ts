// durity code need polish------?
import { Component , OnInit } from '@angular/core';
// ----------------Service------------------------------
import { DialogService } from 'ng2-bootstrap-modal';
import { DoctorService, PatientService, SharedService,DoctorTypeService, NoteService, 
        AlertService, UtilService } from '../_services/index';
// -------------Routing---------------------------------
import { Router, ActivatedRoute } from '@angular/router';
// -------------Model----------------------------------
import {Note , Doctor , DoctorType} from '../_models/index';
// ------------Component--------------------------------
import { CDialogComponent } from '../_dialog_box/index';


@Component({
    moduleId: module.id,
    selector: 'app-add-note',
    templateUrl: 'addNote.component.html',
    styleUrls: ['addNote.component.css']

})


// tslint:disable-next-line:component-class-suffix
export class AddNote implements OnInit{

    // help for hide and show the button
    private hideDetal = true;
    // pagnatino configuration
    public page: Number = 1;
    public itemsPerPage: Number = 10;
    public maxSize: Number = 5;
    public numPages:Number = 1;
    public length: Number = 0;
    public rows: Array<any> = [];
    // row field
    public columns: Array<any> = [
        {title: 'Date' , name: 'noteDate'},
        {title: 'Docter' , name: 'doctorName'},
        {title: 'Type' , name: 'noteType'},
        {title: 'Note' , name: 'description'}
    ];
    // table configuration
    public config: any = {
        paging: true,
        sorting: {columns: this.columns},
        filtering: {filterString: ''},
        className: ['table-striped', , 'table-bordered' ]
    };
    // doctor who login and access the app
    private loginDoctor: Doctor;
    // current docter type
    private currentSelectDoctorType: DoctorType;
    // current patient mr_no
    private mrNo: any;
    // getting all patient note
    private patientNoteList: Array<any>;
    // help full for search aginst the type
    private showCurrentNotes: Array<any>;
    // getting the all docter type
    private allSearchType: Array<DoctorType>;
    // this is show on the top
    private allOptionForNewNote: Array<DoctorType>;
    // this list is helpful to show the current type note need
    private tempPatientNotes: any[] = [];
    // this is current select noteType for search out the all releted to the this 'noteType'
    private noteType: any ;
    private model: any = {};
    private sendType = 'Submit';
    private updateNoteId: Number;
    private tempDoctorTpe: DoctorType;

    // constructor for used the service
    constructor(
        private utilService: UtilService, private _sharedService: SharedService,
        private alertService: AlertService, private dialogService: DialogService,
        private noteService: NoteService, private doctorService: DoctorService,
        private doctorTypeService: DoctorTypeService, private patientService: PatientService,
        public route: ActivatedRoute, private router: Router) {}

    public ngOnInit() {
        this.loginDoctor = JSON.parse(localStorage.getItem('currentUser'));
        this.loadAllDocterType();
        this.getCurrentSelectPatientNote();
   }

    private loadAllDocterType(): any {

        this.doctorTypeService.getAllDoctorType().subscribe(allDoctorType => {
            this.allSearchType = allDoctorType;
            this.allOptionForNewNote = this.allSearchType.filter((item: any) => {
                return  !'ALL'.match(item.type) ;
            });
        });
    }

    private getCurrentSelectPatientNote(): any {

        this.route.params.subscribe(params => {
            this.mrNo = params['mrNo'];
            this.patientService.getAllPatientNote(this.mrNo).subscribe(patientNoteList => {
                this.patientNoteList = patientNoteList;
                if (this.patientNoteList.length === 0){
                    this.patientService.getPatient(this.mrNo).subscribe(patient => {
                        this._sharedService.patientEmitChange('Mr# (' + patient.mrNo + ') Patient Name( ' + patient.name + ')');
                    });
                }else {
                    this._sharedService.patientEmitChange
                     ('Mr# (' + this.patientNoteList[0].patientMrNo + ') Patient Name(' + this.patientNoteList[0].patientName + ')');
                    this.showCurrentNotes = this.patientNoteList;
                    this.onChangeTable(this.config);
                }
            });
        });
    }

    public showhide() {
        if (this.hideDetal) {
            this.hideDetal = false;
        }else {
            this.hideDetal = true;
            this.getCurrentSelectPatientNote();
        }
    }

    // method for used the 
    private filterNotes(noteTypeId: any): void {
        // loop help to match the current selected type 'id'
        this.noteType = this.allSearchType.find(n => n.id === noteTypeId);
        // used the filter
        this.tempPatientNotes = this.patientNoteList.filter((item: any) => {
            return item.noteType.match(this.noteType.type) || 'ALL'.match(this.noteType.type) ;
        });
        // asgin filter array to show on the screen
        this.showCurrentNotes = this.tempPatientNotes;
        // configuer again
        this.onChangeTable(this.config);
     }

    public changePage(page: any, data: Array<any> = this.showCurrentNotes): Array<any> {
        const start = (page.page - 1) * page.itemsPerPage;
        const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    }
    // method's of the table
    public onChangeTable(config:any , page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }

        const filteredData = this.changeFilter(this.showCurrentNotes, this.config);
        const sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
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
                }else {
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
       for (let i = 0; i < columns.length; i++) {
           if (columns[i].sort !== '' && columns[i].sort !== false) {
               columnName = columns[i].name;
               sort = columns[i].sort;
            }
        }
       if (!columnName) {
           return data;
        }
       //  simple sorting
       return data.sort((previous: any, current: any) => {
           if (previous[columnName] > current[columnName]) {
               return sort === 'desc' ? -1 : 1;
            } else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
   }

   // form data
   private onSubmit() {
       if ( this.sendType === 'Submit') {
           this.noteService.addNewNote(this.mrNo, new Note(null, this.model.note, this.utilService.getTodayDate(), this.loginDoctor,
                this.allOptionForNewNote.find( item => item.id === this.model.noteType))).
                    subscribe(data => {
                        // show message on save data
                        this.getCurrentSelectPatientNote();
                        this.showhide();
                        this.model = {};
                        // this.alertService.success(JSON.stringify(data)+'sava');
                    });
        }else if (this.sendType === 'Edit') {
            this.noteService.updateNote(this.updateNoteId, new Note(null, this.model.note, this.utilService.getTodayDate(), null,
                this.allOptionForNewNote.find(item => item.id === this.model.noteType))).
                    subscribe(data =>{
                        // show message on update data
                        this.getCurrentSelectPatientNote();
                        this.showhide();
                        this.model = {};
                        // this.alertService.success(JSON.stringify(data)+'Edit');
                    });
        }
    }

    // this is event on the cell Click
    public onCellClick(data: any): any {
        this.dialogService.addDialog(CDialogComponent, {
            title: 'Patient Notes Operation',
            message: null
        }).
        subscribe((isConfirmed: any) => {
            if (isConfirmed === 'edit') {
                this.sendType = 'Edit';
                this.showhide();
                this.tempDoctorTpe = this.allOptionForNewNote.find((item: any) => {
                    return data.row.noteType.match(item.type);
                });
                this.updateNoteId = data.row.noteId;
                this.model = { noteType: this.tempDoctorTpe.id , note: data.row.description };
            }else if (isConfirmed === 'delete') {
                this.noteService.deleteNote(data.row.noteId).subscribe(deletedata => {}, error => {});
                // configuer again
                const index: number = this.showCurrentNotes.indexOf(data.row);
                if (index !== -1) {
                    this.showCurrentNotes.splice(index, 1);
                }
                this.onChangeTable(this.config);
            }else if (isConfirmed === 'cancel') {}
        });
    }
}