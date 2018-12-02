import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs'
import { of } from 'rxjs/observable/of';
import { ChatBotProvider } from '../providers/chat-bot/chat-bot';
import { BehaviorSubject } from 'rxjs';
import { Message } from './model/IMessage';
import { Log } from '../util/logger';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { MessageCommandHandler } from './message.command.handler';



@Injectable()
export class MessageRepository extends Log {
    messages: Message[] = [];
    messages$: BehaviorSubject<Message[]>;

    uniqueIdentifier: string = null;

    public observableResponse: Observable<any>;
  
    constructor(private provider: ChatBotProvider, 
        private log: Log,
        private commandHandler: MessageCommandHandler,
        private udid: UniqueDeviceID) {
        super();
        this.tag = "MessageRepository";

        this.messages$ = new BehaviorSubject<Message[]>(new Array<Message>());

        this.provider.initialize();
        this.observableResponse = this.provider.getResponseObservable();
        this.observableResponse.subscribe( responseData => {
            this.debug("Recieved a response: " + responseData);
            
            if (responseData != undefined) {    
                // handle commands if there are any
                this.handleCommands(responseData);
                this.messages.push(new Message(Message.MESSAGE_TYPE_BOT, responseData));
                this.messages$.next(this.messages);
            }
        });

        
        if (this.uniqueIdentifier == null) {
            this.debug("Fetching UDID");
            //this.uniqueIdentifier = Date.now() + "";
            this.udid.get()
            .then((uuid: any) => { 
                this.debug(uuid)
                this.uniqueIdentifier = uuid;
            })
            .catch((error: any) => {
                this.error("Failed to fetch udid");
            });
        }
    }


    private handleCommands(responseData) {
        this.debug("Handle commands " + responseData);
        this.commandHandler.handleCommand(responseData);
    }


    getMessages(): Observable<Message[]> {
        return of(this.messages);
    }

    sendMessage(message: string) {
    
        if (null != message) {
           this.provider.send('{"input":"' + message + '", "userid":"'+ this.uniqueIdentifier +'"}');
        }
    }

    addMessage(message: Message) {
        this.debug("Adding message into the repo");
        this.handleCommands(message.raw);
        this.messages.push(message);
        this.messages$.next(this.messages);
    }

    clear() {
        //this.messages = []
        this.messages$.next(new Array<Message>());
    }
}