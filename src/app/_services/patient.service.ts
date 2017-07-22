import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//----------------Service------------------------------
import { ConfigService } from './config.service';
//-------------Routing---------------------------------
//-------------Model-----------------------------------
import { Note, Patient } from '../_models/index';
//-------------Module----------------------------------
//------------Component--------------------------------


@Injectable()
export class PatientService {

    constructor(private http: Http, private configService: ConfigService) { }

    // new patient
    public newPatient(patient:Patient) {
        return this.http.post(this.configService.getnewPatient_url, patient);
    }

    // list of patient
    public getAllPatient(): any {
        return this.http.get(this.configService.getAllPatient_url)
            .map((response: Response) => {
                return response.json();
            });
    }

    public getAllPatientNote(mrNo:Number): any {
        return this.http.get(this.configService.getAllPatientNote_url+mrNo)
            .map((response:Response) => {
                return response.json();
            });
    }

    public getPatient(mrNo:Number): any {
        return this.http.get(this.configService.getpatient_url+mrNo)
            .map((response:Response) => {
                return response.json();
            });
    }

    public deletePatient(mrNo:Number): any {
        return this.http.delete(this.configService.getdeletePatient_url+mrNo);
    }

    public updatePatient(patient:Patient): any {
        return this.http.post(this.configService.getupdatePatient_url+patient.mrNo, JSON.stringify(patient))
            .map((response: Response) => { 
              return response.json();
            });
    }

    
}