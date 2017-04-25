import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Docter } from '../_models/index';

@Injectable()
export class AuthenticationService {
    //
    private UserUrl = 'http://localhost:8080/docter/login';
    constructor(private http: Http) { }
    login(docter: Docter) {
        return this.http.post(this.UserUrl, docter)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user != null) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}