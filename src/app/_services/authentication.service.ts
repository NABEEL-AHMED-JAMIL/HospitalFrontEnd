import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
//----------------Service------------------------------
//-------------Routing---------------------------------
//-------------Model-----------------------------------
import { Docter } from '../_models/index';
//-------------Module----------------------------------
//------------Component--------------------------------


@Injectable()
export class AuthenticationService {
    //
    private userUrl = 'http://localhost:8080/docter/login';

    constructor(private http: Http) { }
    
    public login(docter: Docter): Observable<any> {
        return this.http.post(this.userUrl, docter)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user != null) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));     
                }
            });
    }
    
    public logout(): any {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

}