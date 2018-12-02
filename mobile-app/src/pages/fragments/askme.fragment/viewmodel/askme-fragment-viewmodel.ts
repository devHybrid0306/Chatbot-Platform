import { Log } from '../../../../util/logger';
import { BehaviorSubject } from 'rxjs';
import { IAskMeFragmentViewModel } from '../askme-fragment';
import { Message } from '../../../../data/model/IMessage';



export class AskMeViewModel extends Log implements IAskMeFragmentViewModel {
    // main page selection list
    taskSelectionList: string[] = [];
    taskSelectionList$: BehaviorSubject<string[]>;

    constructor() {
        super();
        this.tag = "MainPageViewModel";

        // initial items
        this.taskSelectionList.push("📚 Learn Something");
        this.taskSelectionList.push("💼  Build your profile");
        this.taskSelectionList.push("🎁  Get a voucher");
        this.taskSelectionList.push("ℹ️  Know about the app");
     
    }


    messagesForID(itemId): Message[] {
        let messages: Message[] = [];
        let startMessage: Message = new Message(Message.MESSAGE_TYPE_BOT, null);
      
        switch(itemId) {
            case 'item-0':  
                startMessage.response.en = "i want to learn english";
                messages.push(startMessage);
                break;

            case 'item-1':
                startMessage.response.en = "create profile";
                messages.push(startMessage);
                break;

            case 'item-2':
                break;
                
            default:
                this.debug("Unknown item");
                return;
        }


        return messages;
    }
}