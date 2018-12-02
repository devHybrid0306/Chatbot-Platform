import { IChatWindowViewModel } from '../../../components/chat-window/chat-window';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../../../data/model/IMessage';
import { MessageRepository } from '../../../data/message.repository';
import { Log } from '../../../util/logger';
import { Injectable } from '@angular/core';

@Injectable()
export class ChatViewModel extends Log implements IChatWindowViewModel {
    messages: Message[] = [];
    messages$: BehaviorSubject<Message[]>;

    constructor(private messageRepo: MessageRepository) {
        super();
        this.tag = "ChatViewModel";
        
        this.messages$ = new BehaviorSubject<Message[]>(new Array<Message>());

        // setup data binding for updated messages.
        this.messageRepo.messages$.subscribe(messages => {
            this.messages = messages;
            this.messages$.next(messages);
        });
    }

    // used in actual sending of messages
    sendMessage(message: string) {
        this.debug("SENDING MESSAGE: " + message);
        if (null != message) {
            var messageObj: Message = new Message(
                Message.MESSAGE_TYPE_USR,
                '{ "message":{"response":{"en":"' + message + '"}}}'
            );
           this.messageRepo.sendMessage(message);
           //this.messageRepo.addMessage(messageObj)
        }
    }


    // used for showing messages to the chat window
    addMessage(message: any, position: number) {
        this.debug("Adding message into the repo");

        if (message instanceof Message) {
            this.debug("Message type detected");
            this.messageRepo.addMessage(message);
        }
        else {
            this.debug("non message detected");
            let msg: Message = new Message(position, message);
            this.messageRepo.addMessage(msg);
        }
       
    }




    clear() {
        this.messages = []
        this.messageRepo.clear();
        this.messages$.next(this.messages);
    }

}