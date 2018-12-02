import { Component, ElementRef } from '@angular/core';
import { IComponentData, SimpleComponent, ComponentEvent } from '../component';
import { Events } from 'ionic-angular';

/**
 * Generated class for the SelectionCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'selection-card',
  templateUrl: 'selection-card.html'
})
export class SelectionCardComponent extends SimpleComponent {
   
  text: string;

  constructor(protected events: Events,
    public elementRef: ElementRef) {
    super(elementRef);
    this.componentId = this.tag = this.className = "SelectionCardComponent";
    this.debug(this.componentData);
  }

  onSelect(event): void {
      if (!this.isEnabled) 
        return;
        
      let target = event.target || event.srcElement || event.currentTarget;
      
      this.debug("Select event " + target);

      this.resetSelection();
      
      let itemData: ISelectionItem = (<ISelectionCardData>this.componentData).selectionItems[event.target.id];
      itemData.isSelected = true;

      this.events.publish(ComponentEvent.ACTION_EVENT, itemData, this.tag);
        this.isEnabled = false;
  }

  resetSelection() {
      for (let item of  (<ISelectionCardData>this.componentData).selectionItems) {
          item.isSelected = false;
      }
  }

}

export interface ISelectionItem {
    title: string;
    payload: any;
    isSelected: boolean;
    elementRef: ElementRef;
}

export interface ISelectionCardData extends IComponentData {
    selectionItems: ISelectionItem[];
    selectedItems: string[];
}