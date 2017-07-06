import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
//----------------Service------------------------------
//-------------Routing---------------------------------
//-------------Model-----------------------------------
import { Note, DocterType } from '../_models/index';
//-------------Module----------------------------------
//------------Component--------------------------------



@Injectable()
export class DocterTypeService {

    private notesUrl = 'http://localhost:8080/';
    
    constructor(private http: Http) { }

   public getAllDoctorType(): any {
        return this.http.get(this.notesUrl+'docType/getAllType', this.jwt())
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

   private jwt() {
       // Website you wish to allow to connect

        let headers = new Headers(
            {'Access-Control-Allow-Origin': 'http://localhost:8888',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
            'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
            'Access-Control-Allow-Credentials': true});
        return new RequestOptions({ headers: headers });
    }


}