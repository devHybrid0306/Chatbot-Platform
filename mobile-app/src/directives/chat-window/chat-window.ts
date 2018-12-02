import { 
    Directive, 
    Input, 
    Renderer} from '@angular/core';
import { Events } from 'ionic-angular';
import { ElementRef } from '@angular/core';
import { Log } from '../../util/logger';

/**
 * Generated class for the ChatWindowDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[chat-window-directive]', // Attribute selector,
  host: {
      '(ionScroll)': 'onChatWindowScroll($event)'
  }
})
export class ChatWindowDirective extends Log {

    static CHAT_SCROLL_EVENT: string = "CHAT_SCROLL_EVENT";    

    @Input('chatWindowTargetElement') target: HTMLElement;
    @Input('chatScrollExecute') executeBlock: Function;
    @Input('chatDirectiveInit') initExecuteBlock: Function;

    isInitialized: boolean = false;

    constructor(private events: Events,
        public renderer: Renderer,
        public elementRef: ElementRef) {
            
            super();
            this.tag = "ChatWindowDirective";
            this.debug('Hello ChatWindowDirective Directive');
    }

    initialize() {
        this.isInitialized = true;
        this.initExecuteBlock(this);
    }


    onChatWindowScroll(event) {
        this.debug(event);
        if (null != event) {
            this.events.publish(ChatWindowDirective.CHAT_SCROLL_EVENT, event);
            if (this.executeBlock != undefined) {
                this.executeBlock(this, event);
            }
        }
    }
}
