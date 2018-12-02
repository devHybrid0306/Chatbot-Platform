import { Component, ViewChild, ElementRef } from '@angular/core';
import { DateTime, Events } from 'ionic-angular';
import { SimpleComponent, ComponentEvent } from '../component';
import { ISimpleMessage } from '../../data/model/IMessage';

/**
 * Generated class for the DatePickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'date-picker',
  templateUrl: 'date-picker.html'
})
export class DatePickerComponent extends SimpleComponent {
    @ViewChild(DateTime) datePicker: DateTime;

    date: any;
    text: string;

    constructor(public elementRef: ElementRef,
        private events: Events) {
        super(elementRef);
        this.componentId = this.tag = "DatePickerComponent";
    }

    ngAfterContentInit() {
        this.datePicker.doneText = "Save";
    }

    onSave() {
        this.debug("Date set: " + this.datePicker.value.month);
        
        let result: ISimpleMessage = { title: this.date, payload: this.date };

        this.events.publish(ComponentEvent.ACTION_EVENT, result, this.componentId);
        this.destroy();
    }

    onClick(event) {
        this.datePicker.open();
    }
}
