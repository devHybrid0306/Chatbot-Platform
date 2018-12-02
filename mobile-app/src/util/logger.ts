import { Injectable } from '@angular/core';

@Injectable()
export class Log {
    tag: string = "LOG";
    d(tag: string, info: any): void {
        this.display("DEBUG", tag, info);
    }

    e(tag: string, info: any): void {
        this.display("ERROR", tag, info);
    }

    protected debug(info): void {
        this.d(this.tag, info);
    }

    protected error(info): void {
        this.e(this.tag, info);
    }


    private display(type: string, tag: string, info: any): void {
        console.log("[" + type + "] " + tag + " - " + info);
    }
}

export interface ILog {
    d(tag: string, info: any): void;
    e(tag: string, info: any): void;
}