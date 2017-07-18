import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//----------------Service------------------------------
import { ConfigService } from './config.service';
//-------------Routing---------------------------------
//-------------Model-----------------------------------
import { Doctor } from '../_models/index';
//-------------Module----------------------------------
//------------Component--------------------------------



@Injectable()
export class DoctorService {
    
    private docterUrl = 'http://localhost:8080/docter/register';

    constructor(private http: Http, private configService: ConfigService) { }
    
    public create(doctor: Doctor): any{
        // , this.jwt()
        return this.http.post(this.docterUrl, doctor)
            .map((response: Response) => {
               return response.json();
            });
    }


    
}