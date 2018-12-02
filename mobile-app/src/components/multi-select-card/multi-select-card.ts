import { Component, ElementRef } from '@angular/core';
import { SelectionCardComponent, ISelectionCardData } from '../selection-card/selection-card';
import { Events } from 'ionic-angular';
import { ISimpleMessage } from '../../data/model/IMessage';
import { ComponentEvent } from '../component';

/**
 * Generated class for the MultiSelectCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'multi-select-card',
  templateUrl: 'multi-select-card.html'
})
export class MultiSelectCardComponent extends SelectionCardComponent{
    selectedItems: number[] = [];      
    text: string;
    hideButton: boolean = false;
    hideText: boolean = false;
    constructor(protected events: Events,
        public elementRef: ElementRef) {
        super(events, elementRef);
        this.componentId = this.className = "MultiSelectCardComponent";
    }

    ngOnInit() {
        let hideBtn = this.componentData["hideButton"];
        let hideText = this.componentData["hideText"];
        if (hideBtn != undefined) {
            this.hideButton = <boolean> hideBtn;
        }

        if (hideText != undefined) {
            this.hideText = <boolean> hideText;
        }
    }

    onSelect(event): void {

        this.isEnabled = false;

        let selectionData = <ISelectionCardData> this.componentData;
        let finalPayload: string = "";
        let finalTitle: string = "";
        let count: number = selectionData.selectionItems.length;
        let delimiter: string = "|";
        let selectedItems: any[] = [];
        for (var i=0; i < count; i++) {
            let item = selectionData.selectionItems[i];
            
            if (item.isSelected) {
                selectedItems.push(item);
            }
        }

        for (var j=0; j < selectedItems.length; j++) {
            let item = selectedItems[j];
            finalPayload += item.payload;
            finalTitle += item.title;

            if (j < selectedItems.length-1 && selectedItems.length > 1) {
                finalPayload += delimiter;
                finalTitle += ", ";
            }
        }


        this.debug("Item: " + finalTitle + ": " + finalPayload);


        let result: ISimpleMessage = {title: finalTitle, payload: finalPayload};
        this.events.publish(ComponentEvent.ACTION_EVENT, result, this.componentId);
        this.isEnabled = false;

    }
}
