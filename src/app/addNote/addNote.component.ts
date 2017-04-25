import { Component , OnInit } from '@angular/core';
import { DocterService } from '../_services/index';
import {DocterTypeService , NoteService , AlertService} from '../_services/index';
import {PatientService} from '../_services/index'; 
import { Router, ActivatedRoute } from '@angular/router';
import {Note , Docter , DocterType} from '../_models/index';
import { DialogService } from "ng2-bootstrap-modal";
import { NoteDialogComponent } from './index';

@Component({
    moduleId:module.id,
    selector: 'add_note',  
    templateUrl:'addNote.component.html',
    styleUrls: ['addNote.component.css']
    
})
export class AddNote implements OnInit{

    // show the name and mr_No of the patient current get from the home page -> Ok
    private patientName: any;
    private patientMrNo: any;
    // table configuration  -> ok
    // this is for each row in the table
    public rows:Array<any> = [];
    // this repersent the each colums in the one row
    public columns:Array<any> = [

      {title: 'Date' , name: 'noteDate'}, 
      {title:'Docter' , name:'docterName'},
      {title:'Type' , name:'noteType'},
      {title:'Note' , name:'description'}
    
    ];
    // config the table
    public config:any = {
      sorting: {columns: this.columns},
      filtering: {filterString: ''},
      className: ['table-striped', , 'table-bordered' ]
    };
    // set the length of the rows in the tables
    public length:number = 0;
    //-----------------------------------
    // current docter who is login
    private currentDocter: Docter;
    // current docter type
    private currentSelectDocterType: DocterType;
    //
    // current patient mr_no
    private mrNo : any;
    // getting all patient note
    private patientNote:Array<any>;
    // help full for search aginst the type
    private showCurrentNotes:Array<any>;
    // getting the all docter type
    private allSearchType:Array<any>;
    // this is show on the top
    private allOptionForNewNote:Array<any>;
    //
    private newNote = false;
    private hideDetal = true;
    private update = false;
    //
    // div show hide method
    Show(){
      //
      this.newNote = true;
      this.hideDetal = false;

    }
     back(){
      //
      this.newNote = false;
      this.hideDetal = true;
      this.getCurrentSelectPatientNote();
      
    }

    // constructor for used the service
    constructor(private alertService:AlertService,private dialogService:DialogService,
    private noteService:NoteService, private docterService: DocterService , 
    private docterTypeService:DocterTypeService , private patientService: PatientService , 
    public route: ActivatedRoute,
    private router: Router) {
      //   current docter login
        this.currentDocter = JSON.parse(localStorage.getItem('currentUser'));
        
      
    }

    public ngOnInit():void {
        //  load all docter type
        this.loadAllDocterType();
        // load the current patient click)
        this.getCurrentSelectPatientNote();

   }

    loadAllDocterType():any{
       // fetching all docter type
       this.docterTypeService.getAllDoctorType().subscribe(allDoctorType => { 
          // assgin to the list of filter the type
          this.allSearchType = allDoctorType;
          
          // remove the first one
           this.allOptionForNewNote = this.allSearchType.filter((item:any) => {
                   return  !"ALL".match(item.type) ;
          });
          // 
        this.allSearchType.forEach(element => {
              if(element.type == "ALL"){
                 element.active = true;
              }else{
                 element.active = false;
                
              }
        });
      
      });
  
    }

    // record of patient in form on note
    getCurrentSelectPatientNote():any{

          //  get URL parameters
          this.route.params.subscribe(params => {this.mrNo = params['mrNo'];});
          // if the mrno is null which is not possible but for some used here like error handler the page
          if(this.mrNo == null){
              //   here chagne required
          }else{
            // get the whole patient note's related to the "MrNo"
              this.patientService.getAllPatientNote(this.mrNo).subscribe(patientObject =>{
                  // if the legth of the note is zero "mean" that if there is not note's than
                  if(patientObject.length == 0){
                      // only show the "name" and the "mrno" on the screen for current select "Patient"
                      this.patientService.getPatient(this.mrNo).subscribe(patientObject =>{
                          this.patientMrNo = patientObject.mrNo;
                          this.patientName = patientObject.name;
                      });
                }else{
                    // if the "Patient" have the object than show the list of "Note's" on the table
                    // used for same as uper condition used for show the "name and mrno""
                    console.log(patientObject);
                    this.patientMrNo = patientObject[0].patientMrNo;
                    this.patientName = patientObject[0].patientName;
                    // used for show the "Patient" list of "Note's"
                    this.patientNote = patientObject;  
                    // configure the table
                    this.showCurrentNotes = this.patientNote;
                    this.onChangeTable(this.config); 
                          
                  }
                });
        }
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
 

    // method's of the table
    public onChangeTable(config:any):any {
      
            if (config.filtering) {
              Object.assign(this.config.filtering, config.filtering);
            }

            if (config.sorting) {
              Object.assign(this.config.sorting, config.sorting);
            }

            let filteredData = this.changeFilter(this.showCurrentNotes, this.config);
            let sortedData = this.changeSort(filteredData, this.config);
            this.rows = sortedData;
          
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
       return filteredData.filter((item:any) =>
         item[config.filtering.columnName].match(this.config.filtering.filterString));
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

// form data and process center here
//------------------------------------------------------------------------------------------------
    model: any = {};
    sendType = "Submit";
    // form data 
    onSubmit() { 

       if(this.sendType == "Submit"){
         if(this.model.note == null){
           this.model.note = "NULL";
        }
        this.docterTypeService.getCurrentTypeSelectByDocter(this.model.noteType).subscribe( data =>{
          this.currentSelectDocterType = data;
          this.noteService
        .addNewNote( this.patientMrNo, new  Note(null,this.model.note,this.model.date,this.currentDocter,this.currentSelectDocterType))
         .subscribe(
                data => {
                    console.log(data);
                     this.model = {};
                      this.newNote = false;
                      this.hideDetal = true;                  
                },
                error => {

                });
              });
              location.reload();
       }else if(this.sendType == "Edit"){
         console.log("Pakistan zindabaaa");
       }
        
        
        
     }
  // this is event on the cell Click
  public onCellClick(data: any): any {
    console.log(data.row.noteId); 
    //
    this.dialogService.addDialog(NoteDialogComponent, {
      title:'Patient Notes Operation',
      message:"Pakistan zinda.........."})
      .subscribe((isConfirmed :any)=>{
        //Get dialog result
         
         if (isConfirmed == "edit"){
           console.log(data.row.noteType);
            // remove the first one
            this.sendType = "Edit";
            this.model = {noteType: data.row.noteType , date : data.row.noteDate , note : data.row.description};
            console.log(this.model);
            this.newNote = true;
            this.hideDetal = false;

        }else if(isConfirmed == "delete"){
          
          this.noteService.deleteNote(data.row.noteId)
          .subscribe(deletedata =>{},error => {});
          location.reload();
        }else if(isConfirmed == "cancel"){
          console.log(isConfirmed);
        }
        
    });
  }
  

}