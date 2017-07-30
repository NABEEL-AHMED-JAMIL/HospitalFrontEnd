import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// ----------------Service------------------------------
import { ConfigService } from './config.service';

@Injectable()
export class AuthenticationService {

    csrfToken: string;
    private headers: Headers;
    constructor(private configService: ConfigService, private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
        this.headers.append('Access-Control-Max-Age', '3600');
        this.headers.append('Access-Control-Allow-Headers', 'x-requested-with, authorization');
     }

    // login service
     public login(loginDto: any): Observable<any> {
        const body = `username=${loginDto.username}&password=${loginDto.password}`;
        return this.http.post(this.configService.getlogin_url, {body: body, headers: this.headers, withCredentials: true })
            .map((response: Response) => {
                console.log(response);
                const Uresponse = response.json();
                if (Uresponse.access_token !== null) {
                    localStorage.setItem('currentUser', JSON.stringify(Uresponse.doctor));
                    localStorage.setItem('access_token' , JSON.stringify(response['access_token']));
                }
            return response.json();
        });
    }

    public forGotPassWord(forgotPassword: String): Observable<any> {
        return this.http.post(this.configService.getforgotPassword_url, forgotPassword);
    }

    public logout(): any {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('access_token');
         return this.http.post(this.configService.getlogout_url, {});
    }

    public initRefreshCall(): any {
        console.log('pakistan');
        const promise = this.http.get(
             this.configService.getrefresh_token_url,
            { headers: this.headers, withCredentials: true }).toPromise()
        .then(response => {
            console.log('res----->' + JSON.stringify(response));
            if (response['access_token'] !== null) {
                localStorage.setItem('access_token' , JSON.stringify(response['access_token']));
                localStorage.setItem('currentUser', JSON.stringify(response['doctor']));
            }else {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('access_token');
            }
        }).catch(() => null);
        return promise;
    }
}
