import { Log } from '../../../util/logger';
import { Input, Injectable } from '@angular/core';
import { isUndefined } from 'ionic-angular/umd/util/util';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { ProfileRepository } from '../../../data/profile.repository';

@Injectable()
export class LoginViewModel extends Log {

    @Input() username: string = "97140101010";
    @Input() password: string = "10";


    
    constructor(private auth: AuthenticationProvider,
        private profileRepo: ProfileRepository) {
        super();
        this.tag = "LoginViewModel";
    }

    isEmpty(): boolean {
        if (this.username == undefined || this.password == undefined) {
            return false;
        }
        return this.username.length < 1 || this.password.length < 1;
    }

    doLogin(completion: Function) {
        this.debug("Logging in");
        this.auth.authenticate(this.username, this.password)
            .subscribe((result)=>{
                this.debug("Auth completed with result " + JSON.stringify(result));

                var status: boolean = false;
                if (result.auth == "True") {
                    status = true;
                    this.profileRepo.userid = this.username;
                }
                completion(status);
                
            },
            (error)=>{

                for (var key in error) {
                    this.debug(key + ":" + error[key]);
                }
                this.debug("Auth failed");
                completion(false);    
            });
    }
}