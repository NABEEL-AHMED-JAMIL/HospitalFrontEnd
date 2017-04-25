import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Note } from '../_models/index';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class DocterTypeService {
    constructor(private http: Http) { }

    //
    // get the all notes  
   private notesUrl = 'http://localhost:8080/';


    getAllDoctorType() {
        return this.http.get(this.notesUrl+'docType/getAllType').map((response: Response) => response.json());
   }

   // get the one_docter 
   getCurrentTypeSelectByDocter(type:Number){
       return this.http.get(this.notesUrl+'docType/'+type).map((response: Response) => response.json());
   }


    addNote(note:Note) {
        let body = JSON.stringify(note);
        console.log(body);
        return this.http.post(this.notesUrl+'patient/note', body  ).map((response: Response) => response.json());
    }


    
}