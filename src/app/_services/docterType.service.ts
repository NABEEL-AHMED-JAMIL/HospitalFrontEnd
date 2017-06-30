import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Note, DocterType } from '../_models/index';
import { Observable }     from 'rxjs/Observable';


@Injectable()
export class DocterTypeService {

    private notesUrl = 'http://localhost:8080/';
    
    constructor(private http: Http) { }

   public getAllDoctorType(): any {
        return this.http.get(this.notesUrl+'docType/getAllType')
            .map((response: Response) => { 
                response.json()
            });
   }

   // get the one_docter 
   public getCurrentTypeSelectByDocter(type:Number): any {
       return this.http.get(this.notesUrl+'docType/'+type)
            .map((response: Response) => {
                response.json()
            });
   }

   public addNote(note:Note): any {
        return this.http.post(this.notesUrl+'patient/note', JSON.stringify(note))
            .map((response: Response) => { 
                response.json()
            });
    }


}