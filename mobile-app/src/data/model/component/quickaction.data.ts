import { Log } from '../../../util/logger';
import { Message } from '../IMessage';
import { IQuickActionData } from '../../../components/quick-action/quick-action';


export class QuickActionMessageData implements IQuickActionData {
    tag: number = 0;
    title: string = "";
    actionList: any[] = [];
    private log: Log = new Log();
    constructor(public content: Message) {
        this.parse();
    }

    parse() {
       this.log.d("QuickActionComponentData","parsing quick action message");
       
            let message: Message = this.content;
            this.tag = message.messageType;
           
            this.log.d("QuickActionComponentData", "replies for message: " + message.response.en);
            
            if (message.response.quick_replies) {
                for (let reply of message.response.quick_replies) {
                   this.log.d("QuickActionComponentData", "adding in reply " + reply);
                    this.actionList.push(reply);
                }
            }

           this.log.d("QuickActionComponentData", "custom content: " + message.response.custom_content);
            if (message.response.custom_content) {
                
                this.log.d("QuickActionComponentData", "response has custom content");

                let quick_replies = message.response.custom_content.quick_replies;
                for (let reply of quick_replies) {
                
                    this.log.d("QuickActionComponentData", "adding in reply " + quick_replies);
                
                    this.actionList.push(reply);
                }
            }
        
    }
}