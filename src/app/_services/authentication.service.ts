import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
//----------------Service------------------------------
import { ConfigService } from './config.service';
//-------------Routing---------------------------------
//-------------Model-----------------------------------
import { DocterDTO } from '../_models/index';
//-------------Module----------------------------------
//------------Component--------------------------------


@Injectable()
export class AuthenticationService {
    

    constructor(private configService: ConfigService, private http: Http) { }

    // login service
     public login(docterDto: DocterDTO): Observable<any> { 
       // for now just used the body
       console.log(this.configService.getlogin_url);
       return this.http.post(this.configService.getlogin_url, docterDto).map((response: Response) => {
            let user = response.json();
            console.log("retrived the user ======> "+JSON.stringify(user));
                if (user != null) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));     
                }
            return response.json();
       });
    }

    public logout(): any {
         // remove user from local storage to log user out
         localStorage.removeItem('principal');
    }

}