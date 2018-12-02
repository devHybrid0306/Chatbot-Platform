import { ISelectionItem } from '../../components/selection-card/selection-card';

// Global event name definition
export const COMMAND_EVENT: string = "COMMAND_EVENT";
export const PAGE_NAVIGATION_EVENT: string = "PAGE_NAVIGATION_EVENT";


export class Message {
    static MESSAGE_TYPE_BOT: number = 0;
    static MESSAGE_TYPE_USR: number = 1;

    private message: IMessage;
    public response: IResponse;
    public system: ISystem;
    public raw: string;

    constructor(public messageType: number, json: string) {
       // if (undefined != json) {
            this.raw = json;
            try {
                this.message = JSON.parse(json)['message'];
                this.response = this.message.response;
                this.system = this.message.system;
                
            }
            catch(e) {
                console.log("Invalid JSON string format. \n" + e);
                this.message = <IMessage> {  system: null, response: { en: json, ar: '', attachments:[], quick_replies:[], custom_content: null }};
                this.response = this.message.response;
            }
      //  }
        this.system = <ISystem> { info: null, bundle: null};
    }


    toString(): string {
        return JSON.stringify(this.message);
    }

}

export interface IMessage {
    response: IResponse;
    system: ISystem;
}

export interface ISystem {
    info: string;
    contentType: string;
    bundle: any;
    command: ISystemCommand[];
}

export interface ISystemCommand {
    commandName: string;
    commandParams: any[];
}

export interface IResponse {
    en: string;
    attachments: IAttachment[];
    quick_replies: ISimpleMessage[];
    custom_content: IActionItems;    
}

export interface IActionItems {
    quick_replies: ISimpleMessage[];
}

export interface IAttachment extends IBaseAttachment {
    contentType: string;
    mode: string;
    body: IAttachmentBody[];
}


export interface IAttachmentBody extends IBaseAttachment {
    content: string;
    title: string;
    subtitle: string;
    actions: ISimpleMessage[];
    text: string;
    contentType: string;
}



export interface ISimpleMessage {
    title: string;
    payload: any;
}

export interface IBaseAttachment {
    contentType: string;
}
