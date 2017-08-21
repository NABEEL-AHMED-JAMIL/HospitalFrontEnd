import { Injectable , NgZone} from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestMethod  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// ----------------Service------------------------------
import { ConfigService } from './config.service';
// -------------Routing---------------------------------
import { Router } from '@angular/router';


@Injectable()
export class AuthenticationService {

    private headers: Headers;
    // , private router: Router,  private zone: NgZone
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
                const URESPONSE  = response.json();
                if (URESPONSE.access_token !== null) {
                    this.loginUserStore(URESPONSE);
                }
            return response.json();
        });
    }

    public forGotPassWord(forgotPassword: String): Observable<any> {

        return this.http.post(this.configService.getforgotPassword_url, forgotPassword);
    }

    public logout(): any {
        return this.http.post(this.configService.getlogout_url, null)
        .map((response: Response) => {
            this.logoutUserStore();
         });
    }

    public initRefreshCall(): any {

        const promise = this.http.get(this.configService.getrefresh_token_url,
            { headers: this.headers, withCredentials: true }).
            toPromise().then(response => {
                const URESPONSE = response.json();
                if (URESPONSE.access_token && URESPONSE.doctor) {
                    this.loginUserStore(URESPONSE);
                }else {
                    this.logoutUserStore();
                }
            }).catch(() => { 
                null
            });
            
        return promise;
    }

    public fetchRestPassWordDetail(id: Number): any {
        
         return this.http.get(this.configService.getfetchRestPassWordDetail + id)
            .map((response: Response) => {
                return response.json();
        });
    }

    public updatePassword(id: Number, password: String){

        return this.http.put(this.configService.getupdatePassword + id, password)
            .map((response: Response) => {
                return response;
        });
    }

    public loginUserStore(URESPONSE: any): any{
        // // store username and jwt token in local storage to keep user logged in between page refreshes
        // localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
        localStorage.setItem('currentUser', JSON.stringify(URESPONSE.doctor));
        localStorage.setItem('access_token' , JSON.stringify(URESPONSE.access_token));
    }

    public logoutUserStore(): any {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('access_token');
    }

    
}
