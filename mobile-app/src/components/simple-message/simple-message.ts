import { Component, Input, ElementRef } from '@angular/core';
import { Events } from 'ionic-angular';
import { SimpleComponent, IComponentEvent, ComponentEvent, IComponentData } from '../component';

/**
 * Generated class for the SimpleMessageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'simple-message',
  templateUrl: 'simple-message.html'
})
export class SimpleMessageComponent extends SimpleComponent {
    
    constructor(protected events: Events, public elementRef: ElementRef) {
        
        super(elementRef);
       
        this.className = "SimpleMessageComponent";
        
    }

}

export interface ISimpleMessageData extends IComponentData {
    text: string;
}


