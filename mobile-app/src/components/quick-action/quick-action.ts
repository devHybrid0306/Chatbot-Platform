import { Component, Input, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import { Events, Label } from 'ionic-angular';
import { IComponentData, SimpleComponent, ComponentEvent } from '../component';
import { ISimpleMessage } from '../../data/model/IMessage';
/**
 * Generated class for the QuickActionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'quick-action',
    templateUrl: 'quick-action.html'
})
export class QuickActionComponent extends SimpleComponent {

    @ViewChild('label', { read: ViewContainerRef }) label;

    constructor(protected events: Events,
        public elementRef: ElementRef) {
        super(elementRef);

        this.componentId = this.className = "QuickActionComponent";

        
    }

    onClick(event) {
        let target = event.target || event.srcElement || event.currentTarget;
        let quickActionData: IQuickActionData = <IQuickActionData> this.componentData;
        let itemPayload: ISimpleMessage = <ISimpleMessage> quickActionData.actionList[target.id];
        this.events.publish(ComponentEvent.ACTION_EVENT, itemPayload, this.componentId);
    }
}

export interface IQuickActionData extends IComponentData {
    actionList: any[];
}