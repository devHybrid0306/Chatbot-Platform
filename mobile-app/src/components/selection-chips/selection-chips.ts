import { Component, ElementRef } from '@angular/core';
import { SelectionCardComponent } from '../selection-card/selection-card';
import { Events } from 'ionic-angular';

/**
 * Generated class for the SelectionChipsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'selection-chips',
  templateUrl: 'selection-chips.html'
})
export class SelectionChipsComponent extends SelectionCardComponent {

  text: string;

  constructor(public events: Events,
    public elementRef: ElementRef) {
    super(events, elementRef);
    this.componentId = this.tag = "SelectionChipsComponent";
  }

  onSelect(event) {
      super.onSelect(event);
      this.destroy();
  }

}
