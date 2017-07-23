import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
//----------------Service------------------------------
import { ConfigService } from './config.service';
//-------------Model-----------------------------------
import { DocterDTO } from '../_models/index';


@Injectable()
export class AuthenticationService {
    

    constructor(private configService: ConfigService, private http: Http) { }

    // login service
     public login(docterDto: DocterDTO): Observable<any> { 
       // for now just used the body
       
       const body = `username=${docterDto.username}&password=${docterDto.password}`;
       const headers = new Headers();
       headers.append('Content-Type', 'application/x-www-form-urlencoded');
       return this.http.post(this.configService.getlogin_url, body, headers).
        map((response: Response) => {
            console.log(response);
            let user = response.json();
            // this will chagne in to the token access user than store the result
            if (user != null) {
                localStorage.setItem('currentUser', JSON.stringify(user));     
            }
            return response.json();
       });
    }

    public forGotPassWord(forgotPassword: String): Observable<any> {
        return this.http.post(this.configService.getforgotPassword_url, forgotPassword);
    }

    public logout(): any {
         localStorage.removeItem('currentUser');
    }

}