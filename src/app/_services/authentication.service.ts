import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestMethod  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// ----------------Service------------------------------
import { ConfigService } from './config.service';

@Injectable()
export class AuthenticationService {

    csrfToken: string;
    private headers: Headers;

    constructor(private configService: ConfigService, private http: Http) {
     }

     private serializeObj(obj) {
         var result = [];
         for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
         return result.join("&");
    }

     // login service
     public login(loginDto: any): Observable<any> {
        
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions( {method: RequestMethod.Post, headers: headers });
        let body = this.serializeObj(loginDto);
        //debugger;
        return this.http.post(this.configService.getlogin_url, body,  options )
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
        const promise = this.http.get(
            this.configService.getrefresh_token_url, { headers: this.headers, withCredentials: true }).toPromise()
        .then(response => {
            console.log('res----->' + response['access_token']);
            if (!response['access_token'] == null) {
                console.log('NOT NULL');
                // only update the tocken
                localStorage.setItem('access_token' , JSON.stringify(response['access_token']));
            }else {
                console.log('NULL');
                localStorage.removeItem('currentUser');
                localStorage.removeItem('access_token');
            }
        }).catch(() => null);
        return promise;
    }

    public fetchRestPassWordDetail(id: Number): any {
        console.log(id);
         return this.http.get(this.configService.getfetchRestPassWordDetail + id)
            .map((response: Response) => {
                return response.json();
        });
    }

    public updatePassword(id: Number, password: String){
        console.log(id + ' and ' + password);
        return this.http.put(this.configService.getupdatePassword + id, password)
            .map((response: Response) => {
                return response;
        });
    }
}
