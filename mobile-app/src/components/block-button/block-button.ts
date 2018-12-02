import { Component, ElementRef } from '@angular/core';
import { SimpleComponent, IComponentData, ComponentEvent } from '../component';
import { Events } from 'ionic-angular';

/**
 * Generated class for the BlockButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'block-button',
  templateUrl: 'block-button.html'
})
export class BlockButtonComponent extends SimpleComponent {

    constructor(private events: Events, public elementRef: ElementRef) {
        super(elementRef);
        this.componentId = this.tag = "BlockButtonComponent";
    }

    onClick(event) {
        if (this.componentData.content.action === "system.fadsd") {
            
        }
        else {
            this.events.publish(ComponentEvent.ACTION_EVENT, this.componentData, this.componentId);
        }
        this.destroy();
    }

}

export interface IBlockButtonData extends IComponentData {
    title: string;
    payload: any;
}
