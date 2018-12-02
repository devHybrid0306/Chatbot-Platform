import { Log } from '../../../util/logger';
import { BehaviorSubject } from 'rxjs';
import { Message, ISimpleMessage } from '../../../data/model/IMessage';
import { IAskMeFragmentViewModel } from '../../fragments/askme.fragment/askme-fragment';


export class MainPageViewModel extends Log implements IAskMeFragmentViewModel {
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


    messagesForID(itemId: string): Message[] {
        let messages: Message[] = [];
        let startMessage: Message = new Message(Message.MESSAGE_TYPE_BOT, null);
      
        switch(itemId) {
            case 'lbl-1': 
                
                startMessage.response.en = "i want to learn english";
                messages.push(startMessage);

                break;
            case 'lbl-2':
                startMessage.response.en = "create profile";
                messages.push(startMessage);
                break;
            case 'lbl-3':
                break;
            default:
                this.debug("Unknown item");
                return;
        }


        return messages;
    }

}