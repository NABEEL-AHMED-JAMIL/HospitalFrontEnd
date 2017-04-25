import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable'; 
import {Note} from '../_models/index';


@Injectable()
export class NoteService {

     private notesUrl = 'http://localhost:8080/';

    constructor(private http: Http) { }

    //
     addNewNote(patientId:String, note:Note) {
        
        return this.http.put(this.notesUrl+'/note/addNote/'+patientId, note).map((response: Response) => response.json());
    }

    // delete
    deleteNote(id:Number){
        //
        return this.http.delete(this.notesUrl+'/note/delete/'+id).map((response: Response) => response.json());

    }

  
    
}