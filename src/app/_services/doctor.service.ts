import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
// ----------------Service------------------------------
import { ConfigService } from './config.service';
// -------------Model-----------------------------------
import { DoctorDTO } from '../_models/index';



@Injectable()
export class DoctorService {

    constructor(private http: Http, private configService: ConfigService) { }

    public create(doctorDTO: DoctorDTO): any{
        // , this.jwt()
        return this.http.post(this.configService.getregister_url, doctorDTO)
            .map((response: Response) => {
               return response.json();
            });
    }

}