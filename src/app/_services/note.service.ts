import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
// ----------------Service------------------------------
import { ConfigService } from './config.service';
// -------------Model-----------------------------------
import {Note} from '../_models/index';


@Injectable()
export class NoteService {

    private token: any;

    constructor(private http: Http, private configService: ConfigService) {
        this.token = JSON.parse(localStorage.getItem('currentUser'));
     }

    public addNewNote(patientId: Number, note: Note): any {
        return this.http.put(this.configService.getnewNote_url + patientId, {body: note, headers: this.token})
            .map((response: Response) => {
               return response.json();
            });
    }

    public deleteNote(id: Number): any {
        return this.http.delete(this.configService.getdeleteNote_url + id, {headers: this.token})
            .map((response: Response) => {
               return response.json();
            });
    }

   public updateNote(id: Number , note: Note): any {
       return this.http.put(this.configService.getupdateNote_url + id , {body: note, headers: this.token})
            .map((response: Response) => {
               return response.json();
            });
    }

    public getAllNotes(): any {
        return this.http.get(this.configService.getAllNotes_url)
            .map((response: Response) => {
                return response.json();
            });
    }

}
