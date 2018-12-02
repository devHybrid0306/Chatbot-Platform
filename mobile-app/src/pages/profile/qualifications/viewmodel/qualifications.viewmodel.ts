import { Log } from "../../../../util/logger";
import { Input } from '@angular/core';

export class QualificationsViewModel extends Log {
    @Input() course: string;
    didFinishHighSchool: boolean = false;
    didFinishCollege: boolean = false;
    skillTypeNoHS: string;

    constructor() {
        super();
        this.tag = "QualificationsViewModel";
    }

    setDidFinishHighSchool(didFinish: boolean) {
        this.debug("Setting HS did finish");
        this.didFinishHighSchool = didFinish;
    }

    setDidFinishCollege(didFinish: boolean) {
        this.didFinishCollege = didFinish;
    }

    setSkillTypeNoHS(skillType: string) {
        this.skillTypeNoHS = skillType;
    }

    getPayload() {
        return {
            ifhsgrad: this.didFinishHighSchool,
            ifunivgrad: this.didFinishCollege,
            coursecerttaken: this.course,
            skillsacquisition: this.skillTypeNoHS
        };
    }

}