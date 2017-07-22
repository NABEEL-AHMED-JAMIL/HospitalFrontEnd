import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//----------------Service------------------------------
import { ConfigService } from './config.service';
//-------------Routing---------------------------------



@Injectable()
export class RoleService {
    

    constructor(private http: Http, private configService: ConfigService) { }
    
    public getRole(): any{
        // , this.jwt()
        return this.http.get(this.configService.getRoles_url)
            .map((response: Response) => {
               return response.json();
            });
    }
        
}