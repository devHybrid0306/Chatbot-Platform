import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProfileProvider } from '../IProfileProvider';
import { Observable } from 'rxjs/Observable';
import { Log } from '../../util/logger';

/*
  Generated class for the UserProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProfileProvider extends Log implements IProfileProvider {
    serviceURL: string = "http://23.96.114.163";
    profile: Object = {};

    constructor(public http: HttpClient) {
        super();
        this.tag = "UserProfileProvider";
    }

    initialize() {
        
    }

    fetchProfile(profileId: string): Observable<any> {
        let path = "/api/getuserprofile";
        let params = new HttpParams();
        //params.append("phonenumber", profileId);
        return this.http.post(this.serviceURL + path, {phonenumber: profileId}, {params: params});
    }


    updateProfile(profile: any): Observable<any> {
        let path = "/api/updateone";
        return this.http.post(this.serviceURL + path, profile);   
    }

    updateProfileRecord(userid: string, profileKey: string, newValue: any): Observable<any> {
        let path = "/api/updateone";
        let obj: Object = {};
        obj['userid'] = userid;
        obj[profileKey] = newValue;
        return this.http.post(this.serviceURL + path, obj);
    }

}
