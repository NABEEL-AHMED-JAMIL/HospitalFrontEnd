import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// ----------------Service------------------------------
import { ConfigService } from './config.service';
// -------------Model-----------------------------------
import { DoctorType } from '../_models/index';



@Injectable()
export class DoctorTypeService {

    private token: any;

    constructor(private http: Http, private configService: ConfigService) {
        this.token = JSON.parse(localStorage.getItem('currentUser'));
     }

   public getAllDoctorType(): any {
        return this.http.get(this.configService.getAllDotorTypes_url)
            .map((response: Response) => {
                return response.json();
            });
   }

   // get the one_docter
   public getCurrentTypeSelectByDocter(type: Number): any {
       return this.http.get(this.configService.getDoctorType_url + type)
            .map((response: Response) => {
               return response.json();
            });
   }

   public createNewDoctorType(doctorType: String): any {
       console.log(this.configService.getaddDoctorType_url +  '------' +  doctorType);
       return this.http.post(this.configService.getaddDoctorType_url, {body: doctorType, headers: this.token}).
           map((response: Response) => { return response.json(); });
   }

}
