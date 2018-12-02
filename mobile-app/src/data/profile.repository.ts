import { Log } from "../util/logger";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProfile } from "./model/IProfile";
import { UserProfileProvider } from '../providers/user-profile/user-profile';
import { AuthenticationProvider } from '../providers/authentication/authentication';

@Injectable()
export class ProfileRepository extends Log {
    userid: string;
    profile: IProfile;
    profile$: BehaviorSubject<IProfile>;

    constructor(private profileProvider: UserProfileProvider) {
        super();
        this.tag = "ProfileRepository";

        // initialize members
        this.profile$ = new BehaviorSubject<IProfile>(<IProfile>{});
    }

    getProfile() {
        this.profileProvider.fetchProfile(this.userid)
        .subscribe((result)=> {
            this.debug(JSON.stringify(result));
            this.profile = <IProfile> result;
            this.profile$.next(this.profile);
        });
    }

    updateProfile(name: string, value: string) {
        this.profileProvider.updateProfileRecord(this.profile.userid, name, value)
        .subscribe((result)=>{
            this.debug("Update profile result " + JSON.stringify(result));
            this.getProfile();
        });
    }

    saveProfile(profile: IProfile) {
        this.profileProvider.updateProfile(profile).subscribe((result)=>{
            this.debug("Update profile result " + JSON.stringify(result));
            this.getProfile();
        });
    }

}