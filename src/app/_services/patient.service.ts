import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Note } from '../_models/index';

@Injectable()
export class PatientService {
    constructor(private http: Http) { }

    //
    // get the all notes  
   private notesUrl = 'http://localhost:8080/';


   getAllPatient() {
        return this.http.get(this.notesUrl+'patient/getAllPatient').map((response: Response) => response.json());
    }

    getAllPatientNote(mrNo:Number){
        return this.http.get(this.notesUrl+'patient/notes/'+mrNo).map((response: Response) => response.json());
    }

    getPatient(mrNo:Number){
        return this.http.get(this.notesUrl+'patient/'+mrNo).map((response: Response) => response.json());
    }

    deletePatient(mrNo:Number){
        return this.http.delete(this.notesUrl+'patient/'+mrNo).map((response: Response) => response.json());
    }

    




    
}