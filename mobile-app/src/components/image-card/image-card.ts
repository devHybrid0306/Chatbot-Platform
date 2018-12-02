import { Component, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import { IComponentData, SimpleComponent, ComponentEvent } from '../component';
import { Card, Events } from 'ionic-angular';
import { ISelectionItem } from '../selection-card/selection-card';

/**
 * Generated class for the ImageCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'image-card',
  templateUrl: 'image-card.html'
})
export class ImageCardComponent extends SimpleComponent {
    constructor(protected events: Events, public elementRef: ElementRef) {
        super(elementRef);

        this.componentId = this.className = "ImageCardComponent";

        
    }

    onSelect(event): void {
        let target = event.target || event.srcElement || event.currentTarget;
        
        this.debug("Select event " + target);
        
        let itemData: IImageCardItem = (<IImageCardData>this.componentData).selectionItems[event.target.id];
        itemData.isSelected = true;

        this.events.publish(ComponentEvent.ACTION_EVENT, itemData, this.componentId);
        this.isEnabled = false
    }

}

export interface IImageCardItem {
    title: string;
    payload: any;
    isSelected: boolean;
}

export interface IImageCardData extends IComponentData {
    imageSource: string;
    title: string;
    subtitle: string;
    text: string;
    selectionItems: ISelectionItem[];
}
