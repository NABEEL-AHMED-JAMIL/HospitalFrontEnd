import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Docter } from '../_models/index';

@Injectable()
export class DocterService {
    constructor(private http: Http) { }

    //
    private DocterUrl = 'http://localhost:8080/docter/login'
    create(docter: Docter) {
        return this.http.post(this.DocterUrl, docter, this.jwt()).map((response: Response) => response.json());
    }


    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentDocter = JSON.parse(localStorage.getItem('currentDocter'));
        if (currentDocter && currentDocter.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentDocter.token });
            return new RequestOptions({ headers: headers });
        }
    }
}