import { Log } from '../../../util/logger';
import { ProfileRepository } from '../../../data/profile.repository';
import { Injectable, Input } from '@angular/core';
import { IProfile } from '../../../data/model/IProfile';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { IComponentData } from '../../../components/component';
import { IAttachmentBody } from '../../../data/model/IMessage';
import { SelectionCardData } from '../../../data/model/component/selectioncard.data';

@Injectable()
export class ProfileViewModel extends Log {
  
    profile: IProfile = <IProfile> {};
    profile$: BehaviorSubject<IProfile>;

    constructor(private repo: ProfileRepository) {
        super();
        this.tag = "ProfileViewModel";
        
        this.profile$ = new BehaviorSubject<IProfile>(this.profile);

        this.repo.profile$.subscribe(profile => {
            this.debug("Profile received " + JSON.stringify(profile));
            
            this.profile = profile;
            this.profile$.next(this.profile);
        });


    }

    updateProfileRecord(key: string, value: string) {
        this.repo.updateProfile(key, value);
    }

    getLanguageAsArray(): string[] {
        return (this.profile.preferredlanguage != undefined) ? this.profile.preferredlanguage.split("|") : [];
    }
  
    getLanguageLabel(): string {
        let languages: string[] = (this.profile.preferredlanguage != undefined) ? this.profile.preferredlanguage.split("|") : [];
        var resultString = "";
        for (var i=0; i < languages.length; i++) {
            if (i > 0) 
                resultString += ", ";
            resultString += languages[i];
           
        }
        return resultString;
    }

    getProfile() {
        this.repo.getProfile();
    }

    saveProfile() {
        this.repo.saveProfile(this.profile);
    }

    componentDataForLanguages(): IComponentData {
        let attachmentBody: IAttachmentBody = <IAttachmentBody> {
            title: "Language",
            content: null,
            actions: [
                {title: "Hindi", payload: "hindi"},
                {title: "English", payload: "english"},
                {title: "Arabic", payload: "arabic"},
                {title: "Malayam", payload: "malayam"},
                {title: "Marathi", payload: "marathi"},
                {title: "Tamil", payload: "tamil"},
                {title: "Telegu", payload: "telegu"},
                {title: "Punjabi", payload: "punjabi"}
            ]
        };
        let componentData: SelectionCardData = new SelectionCardData(attachmentBody);
        componentData["hideButton"] = false;
        componentData["hideText"] = true;


        componentData.selectedItems = this.getLanguageAsArray();
        componentData.parse();

        return componentData;
    }
}