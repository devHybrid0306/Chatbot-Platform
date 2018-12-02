import { Observable } from 'rxjs/Observable';

export interface IMessageProvider {
    initialize();
    send(message: any);
    getResponseObservable(): Observable<Object>;
}