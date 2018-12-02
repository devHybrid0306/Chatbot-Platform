import { Observable } from "rxjs";

export interface IProfileProvider {
    initialize();

    fetchProfile(profileId: string): Observable<any>;
    updateProfile(profile: any): Observable<any>;
    
}