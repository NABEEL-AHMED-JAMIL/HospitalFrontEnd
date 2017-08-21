import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
// ----------------Service------------------------------
import { ConfigService } from './config.service';
// -------------Model-----------------------------------
import { DoctorDTO } from '../dto/index';



@Injectable()
export class DoctorService {

    constructor(private http: Http, private configService: ConfigService) { }

    public create(doctorDTO: DoctorDTO): any{
        return this.http.post(this.configService.getregister_url, { body: doctorDTO })
            .map((response: Response) => {
               return response.json();
            });
    }

}