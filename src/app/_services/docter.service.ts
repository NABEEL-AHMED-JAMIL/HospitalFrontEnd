import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//----------------Service------------------------------
//-------------Routing---------------------------------
//-------------Model-----------------------------------
import { Docter } from '../_models/index';
//-------------Module----------------------------------
//------------Component--------------------------------



@Injectable()
export class DocterService {
    
    private docterUrl = 'http://localhost:8080/docter/register';

    constructor(private http: Http) { }
    
    public create(docter: Docter): any{
        // , this.jwt()
        return this.http.post(this.docterUrl, docter , this.jwt())
            .map((response: Response) => {
                response.json()
            });
    }

    
    private jwt() {
        let headers = new Headers({ 'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==' });
        return new RequestOptions({ headers: headers });
    }
    
}