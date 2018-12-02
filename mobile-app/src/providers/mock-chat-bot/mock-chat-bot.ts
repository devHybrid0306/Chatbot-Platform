import { Injectable } from '@angular/core';
import { IMessageProvider } from '../IMessageProvider';
import { ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the MockChatBotProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MockChatBotProvider implements IMessageProvider {

  response: ReplaySubject<string> = new ReplaySubject<string>();

  constructor() {
    console.log('Mock Chat Bot Provider');
  }

  initialize() {

  }

  send(message: string) {
    this.response.next(message);
  }

  getResponseObservable(): Observable<string> {
    return this.response;
  }

}
