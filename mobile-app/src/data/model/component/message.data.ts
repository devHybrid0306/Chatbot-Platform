import { ISimpleMessageData } from '../../../components/simple-message/simple-message';
import { Message } from '../IMessage';
export class MessageComponentData implements ISimpleMessageData {
    text:string;
    tag: number;
    title: string;
    constructor(public content: any) {
            this.parse();
        }

    parse() {
        let message: Message = <Message> this.content;
        if (undefined != message) {
            this.title = this.text = message.response.en;
            this.tag = message.messageType;
        }
    }
}
