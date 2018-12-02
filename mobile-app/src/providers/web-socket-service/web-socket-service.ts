import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import { Observable, Subject } from 'rxjs';
import { Events, ToastController } from 'ionic-angular';
import { Log } from '../../util/logger';

/*
  Generated class for the ServicesWebSocketServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebSocketServiceProvider extends Log {

  private subject: Rx.Subject<MessageEvent>;

  constructor(private events: Events,
    private toast: ToastController) {
      super();
      this.tag = "WebSocketServiceProvider";
    
  }


  connect(url: string): Rx.Subject<MessageEvent> {
    if (null == this.subject) {
      let webSocket: WebSocket = new WebSocket(url);

      // create observable
      let observable = Rx.Observable.create((observer: Rx.Observer<MessageEvent>)=> {
        webSocket.onmessage = observer.next.bind(observer);
        webSocket.onerror = observer.error.bind(observer);
        webSocket.onclose = observer.complete.bind(observer);
        return webSocket.close.bind(webSocket);
      });

      let observer = {
        next: (data: Object) => {
          if (webSocket.readyState === WebSocket.OPEN) {
            this.debug("sending data: " + data);
            
            webSocket.send(JSON.stringify(data));
          }
          else {
            this.debug("Connection is not available.");
            this.toast.create({
                message: "Connection is unavailable.",
                duration: 3000,
                position: 'top'
              }).present();
          }
        },

        error: (socket, event) => {
            this.error("Connection error.");
        },
        complete: (socket, event) => {
            this.debug("Complete");
        }
      };

      this.subject = Rx.Subject.create(observer, observable);
      this.debug("Connected to server: " + url);
    }
    return this.subject;

  }
}
