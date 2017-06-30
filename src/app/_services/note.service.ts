import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
//----------------Service------------------------------
//-------------Routing---------------------------------
//-------------Model-----------------------------------
import {Note} from '../_models/index';
//-------------Module----------------------------------
//------------Component--------------------------------


@Injectable()
export class NoteService {
    
    private notesUrl = 'http://localhost:8080/';
    
    constructor(private http: Http) { }
    
    public addNewNote(patientId:String, note:Note): any {
        return this.http.put(this.notesUrl+'/note/addNote/'+patientId, note)
            .map((response: Response) => {
                response.json()
            });
    }
    
    public deleteNote(id:Number): any {
        return this.http.delete(this.notesUrl+'/note/delete/'+id)
            .map((response: Response) => {
                response.json()
            });
    }

   public updateNote(id:Number , note:Note): any {
       return this.http.put(this.notesUrl+'/note/'+id , note)
            .map((response:Response) => {
                response.json()
            });
    }

}