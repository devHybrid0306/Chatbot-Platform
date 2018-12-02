import { HttpClient, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Log } from '../../util/logger';
import { Observable, Observer } from 'rxjs';

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider extends Log {
    
    hostUrl: string = "http://23.96.114.163";

    constructor(public http: HttpClient) {
        super();
        this.tag = "AuthenticationProvider";
    }

    authenticate(username: string, password: string): Observable<any> {
        let path = '/api/loginauth?phonenumber=' + username + '&password=' + password;
        let httpHeaders = new HttpHeaders();

        httpHeaders.append("phonenumber", username);
        httpHeaders.append("password", password);
        
        return this.http.post<any>(this.hostUrl + path, 
                {
                    headers: httpHeaders, 
                    observe: "response",
                    responseType: "text"
                }
            );
    }

}
