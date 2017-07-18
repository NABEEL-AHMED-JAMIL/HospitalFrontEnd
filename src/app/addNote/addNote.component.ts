import { Component , OnInit } from '@angular/core';
//----------------Service------------------------------
import { DialogService } from "ng2-bootstrap-modal";
import { DoctorService, PatientService,
         SharedService,DoctorTypeService,
         NoteService , AlertService, UtilService } from '../_services/index';
//-------------Routing---------------------------------
import { Router, ActivatedRoute } from '@angular/router';
//-------------Model----------------------------------
import {Note , Doctor , DoctorType} from '../_models/index';
//-------------Module----------------------------------
//------------Component--------------------------------
import { CDialogComponent } from '../_dialog_box/index';


@Component({
    moduleId: module.id,
    selector: 'add_note',  
    templateUrl:'addNote.component.html',
    styleUrls: ['addNote.component.css']
    
})


export class AddNote implements OnInit{
    private patientName: any;
    private patientMrNo: any;
    // help for hide and show the button
    private newNote = false;
    private hideDetal = true;
    // table configuration
    public page:number = 1;
    public itemsPerPage:number = 10;
    public maxSize:number = 5;
    public numPages:number = 1;
    public length:number = 0;
    public rows:Array<any> = [];
    public columns:Array<any> = [
        {title: 'Date' , name: 'noteDate'},
        {title:'Docter' , name:'docterName'},
        {title:'Type' , name:'noteType'},
        {title:'Note' , name:'description'}
    ];
    public config:any = {
        paging: true,
        sorting: {columns: this.columns},
        filtering: {filterString: ''},
        className: ['table-striped', , 'table-bordered' ]
    };
    // doctor who login and access the app
    private currentDoctor: Doctor;
    // current docter type
    private currentSelectDoctorType: DoctorType;
    // current patient mr_no
    private mrNo : any;
    // getting all patient note
    private patientNote:Array<any>;
    // help full for search aginst the type
    private showCurrentNotes:Array<any>;
    // getting the all docter type
    private allSearchType: Array<DoctorType>;
    // this is show on the top
    private allOptionForNewNote:Array<DoctorType>;

    // constructor for used the service
    constructor(
        private utilService:UtilService, private _sharedService: SharedService,
        private alertService:AlertService, private dialogService:DialogService,
        private noteService:NoteService, private doctorService: DoctorService , 
        private doctorTypeService:DoctorTypeService, private patientService: PatientService,
        public route: ActivatedRoute, private router: Router) {
        
            this.currentDoctor = JSON.parse(localStorage.getItem('currentUser'));
    }
    
    public ngOnInit() {
        this.loadAllDocterType();
        this.getCurrentSelectPatientNote();
   }
   
    private loadAllDocterType():any {
        
       this.doctorTypeService.getAllDoctorType().
           subscribe(allDoctorType => { 
               this.allSearchType = allDoctorType;          
               // remove the first one
               this.allOptionForNewNote = this.allSearchType.filter((item:any) => {
                   return  !"ALL".match(item.type) ;
                });
            });
    }

    private getCurrentSelectPatientNote():any {

        this.route.params.subscribe(params => {this.mrNo = params['mrNo'];});
        // if the mrno is null which is not possible but for some used here like error handler the page
        if(this.mrNo == null){
            //   here chagne required
        }else{
            // get the whole patient note's related to the "MrNo"
            this.patientService.getAllPatientNote(this.mrNo).
                subscribe(patientObject => {
                    console.log(JSON.stringify(patientObject));
                    if(patientObject.length == 0) {
                      // only show the "name" and the "mrno" on the screen for current select "Patient"
                      this.patientService.getPatient(this.mrNo).
                          subscribe(patientObject => {
                              this.patientMrNo = patientObject.mrNo;
                              this.patientName = patientObject.name;
                              this._sharedService.emitChange("Mr # ("+this.patientMrNo+") Patient Name("+this.patientName+")");
                      });
                    }else{
                        // if the "Patient" have the object than show the list of "Note's" on the table
                        // used for same as uper condition used for show the "name and mrno""
                        this.patientMrNo = patientObject[0].patientMrNo;
                        this.patientName = patientObject[0].patientName;
                        this._sharedService.emitChange("Mr # ("+this.patientMrNo+") Patient Name("+this.patientName+")");
                        this.patientNote = patientObject;  
                        // configure the table
                        this.showCurrentNotes = this.patientNote;
                        this.onChangeTable(this.config); 
                  }
                });
        }
    }
    
    public Show() {  
      this.newNote = true;
      this.hideDetal = false;
    }
    public back(){
      this.newNote = false;
      this.hideDetal = true;
      this.getCurrentSelectPatientNote();
    }
    
    // this list is helpful to show the current type note need
    private tempPatientNotes:any[] = [];
    // this is current select noteType for search out the all releted to the this "noteType"
    private noteType :any ;
    // method for used the 
    private filterNotes(noteTypeId: any): void {
        // loop help to match the current selected type "id" 
        this.noteType = this.allSearchType.find(n => n.id == noteTypeId);
        // used the filter 
        this.tempPatientNotes = this.patientNote.filter((item:any) => {
            return item.noteType.match(this.noteType.type) || "ALL".match(this.noteType.type) ;
        });
        // asgin filter array to show on the screen
        this.showCurrentNotes = this.tempPatientNotes;
        // configuer again
        this.onChangeTable(this.config);
         
     }

    public changePage(page:any, data:Array<any> = this.showCurrentNotes):Array<any> {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
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
        
        let filteredData = this.changeFilter(this.showCurrentNotes, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
          
   }
   
   // this is the filter that filter the data in the table
   public changeFilter(data:any, config:any):any {
       let filteredData:Array<any> = data;
       this.columns.forEach((column:any) => {
           if (column.filtering) {
               filteredData = filteredData.filter((item:any) => {
                   return item[column.name].match(column.filtering.filterString);
                });
            }
        });
       if (!config.filtering) {
           return filteredData;
        }
        if (config.filtering.columnName) {
            return filteredData.filter((item:any) => {
                item[config.filtering.columnName].match(this.config.filtering.filterString)
            });
        }
        let tempArray:Array<any> = [];
        filteredData.forEach((item:any) => {
            let flag = false;
            this.columns.forEach((column:any) => {
                if (item[column.name].toString().match(this.config.filtering.filterString)) {
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
       //  simple sorting
       return data.sort((previous:any, current:any) => {
           if (previous[columnName] > current[columnName]) {
               return sort === 'desc' ? -1 : 1;
            } else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
   }
   private model: any = {};
   private sendType = "Submit";
   // form data 
   private onSubmit() { 
       if(this.sendType == "Submit") {
           if(this.model.note == null) {
               this.model.note = "NULL";
            }
          this.noteService.addNewNote(this.patientMrNo, new Note(null, this.model.note, this.utilService.getTodayDate(), this.currentDoctor, 
                this.allOptionForNewNote.find( item => item.id == this.model.noteType))).
                    subscribe(data => {
                        this.getCurrentSelectPatientNote();
                        this.newNote = false;
                        this.hideDetal = true;
                        this.model = null;
                    });
        }else if(this.sendType == "Edit") {
            this.noteService.updateNote(this.updateNoteId, new Note(null,this.model.note,this.utilService.getTodayDate(), null,
                this.allOptionForNewNote.find(item => item.id == this.model.noteType))).
                    subscribe(data =>{
                        this.getCurrentSelectPatientNote();
                        this.newNote = false;
                        this.hideDetal = true;
                        this.model = null;
                    });      
        }
    }
    private updateNoteId:Number;
    private tempDoctor:DoctorType;
    // this is event on the cell Click
    public onCellClick(data: any): any {
        this.dialogService.addDialog(CDialogComponent, {
            title:'Patient Notes Operation',
            message:"Pakistan zinda.........."
        }).
        subscribe((isConfirmed :any)=> {
            if (isConfirmed == "edit") {
                this.sendType = "Edit";
                this.newNote = true;
                this.hideDetal = false;
                // set the model for update
                // first filter the note and 
                this.tempDoctor = this.allOptionForNewNote.find((item:any) => {
                    return data.row.noteType.match(item.type)
                });
                // get the id of the note
                this.updateNoteId = data.row.noteId;
                this.model = { noteType: this.tempDoctor.id , note: data.row.description };
            }else if(isConfirmed == "delete") {
                this.noteService.deleteNote(data.row.noteId).subscribe(deletedata => {}, error => {});
                // configuer again
                let index: number = this.showCurrentNotes.indexOf(data.row);
                if (index !== -1) {
                    this.showCurrentNotes.splice(index, 1);
                }
                this.onChangeTable(this.config);
            }else if(isConfirmed == "cancel") {}
        });
    }
}