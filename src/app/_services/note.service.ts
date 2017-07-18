import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
//----------------Service------------------------------
import { ConfigService } from './config.service';
//-------------Routing---------------------------------
//-------------Model-----------------------------------
import {Note} from '../_models/index';
//-------------Module----------------------------------
//------------Component--------------------------------


@Injectable()
export class NoteService {

    
    constructor(private http: Http, private configService: ConfigService) { }
    
    public addNewNote(patientId:Number, note:Note): any {
        return this.http.put(this.configService.getnewNote_url+patientId, note)
            .map((response: Response) => {
               return response.json()
            });
    }
    
    public deleteNote(id:Number): any {
        return this.http.delete(this.configService.getdeleteNote_url)
            .map((response: Response) => {
               return response.json();
            });
    }

   public updateNote(id:Number , note:Note): any {
       return this.http.put(this.configService.getupdateNote_url+id , note)
            .map((response:Response) => {
               return response.json();
            });
    }

    public getAllNotes(): any{
        return this.http.get(this.configService.getAllNotes_url)
            .map((response: Response) => {
                return response.json();
            });
    }

}