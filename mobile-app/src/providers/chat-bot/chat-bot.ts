import { Injectable } from '@angular/core';
import { IMessageProvider } from '../IMessageProvider';
import { WebSocketServiceProvider } from '../web-socket-service/web-socket-service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as Rx from 'rxjs';
import { ReplaySubject, Subject } from 'rxjs';
import { Log } from '../../util/logger';
/*
  Generated class for the ChatBotProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatBotProvider extends Log implements IMessageProvider {
    
  public isMock: boolean = false;
  private chatServiceURL: string = "ws://23.96.114.163:443";
  
  response: Subject<string> = new Subject<string>();
  subject: Rx.Subject<MessageEvent>;


  constructor(private webSocketProvider: WebSocketServiceProvider) {
       super();
       this.tag = "ChatBotProvider";
  }

  initialize() {
     // Data binding
     this.subject = this.webSocketProvider.connect(this.chatServiceURL);
     this.subject.subscribe(res => {
       this.debug("recieved response: " + res.data);
       this.response.next(res.data);
     });

  }

  public send(message: any): void {
      this.debug("Sending message " + message);
      this.subject.next(JSON.parse(message));
  }

  public getResponseObservable(): Observable<Object> {
    return this.response;
  }

}
