import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
// ----------------Service------------------------------
import { ConfigService } from './config.service';
// -------------Model-----------------------------------
import { DoctorDTO } from '../_models/index';



@Injectable()
export class DoctorService {

    private token: any;

    constructor(private http: Http, private configService: ConfigService) {
        this.token = JSON.parse(localStorage.getItem('currentUser'));
     }

    public create(doctorDTO: DoctorDTO): any{
        return this.http.post(this.configService.getregister_url, {body: doctorDTO, headers: this.token})
            .map((response: Response) => {
               return response.json();
            });
    }

}