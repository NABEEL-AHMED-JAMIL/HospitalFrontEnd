import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//----------------Service------------------------------
//-------------Routing---------------------------------
//-------------Model-----------------------------------
import { Note } from '../_models/index';
//-------------Module----------------------------------
//------------Component--------------------------------


@Injectable()
export class PatientService {

    private notesUrl = 'http://localhost:8080/';

    constructor(private http: Http) { }
    
    public getAllPatient(): any {
        return this.http.get(this.notesUrl+'patient/getAllPatient')
            .map((response: Response) => {
                response.json()
            });
    }

    public getAllPatientNote(mrNo:Number): any {
        return this.http.get(this.notesUrl+'patient/notes/'+mrNo)
            .map((response: Response) => {
                response.json()
            });
    }

    public getPatient(mrNo:Number): any {
        return this.http.get(this.notesUrl+'patient/'+mrNo)
            .map((response: Response) => {
                response.json()
            });
    }

    public deletePatient(mrNo:Number): any {
        return this.http.delete(this.notesUrl+'patient/'+mrNo)
            .map((response: Response) => {
                response.json()
            });
    }
    
}