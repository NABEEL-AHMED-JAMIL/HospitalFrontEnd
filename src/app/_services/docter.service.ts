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
    
    private DocterUrl = 'http://localhost:8080/docter/register';

    constructor(private http: Http) { }
    
    public create(docter: Docter): any{
        // , this.jwt()
        return this.http.post(this.DocterUrl, docter )
            .map((response: Response) => {
                response.json()
            });
    }

    // private helper methods

    // private jwt() {
    //     // create authorization header with jwt token
    //     let currentDocter = JSON.parse(localStorage.getItem('currentDocter'));
    //     if (currentDocter && currentDocter.token) {
    //         let headers = new Headers({ 'Authorization': 'Bearer ' + currentDocter.token });
    //         return new RequestOptions({ headers: headers });
    //     }
    // }
}