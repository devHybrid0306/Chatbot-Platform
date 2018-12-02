import { Component, ElementRef, ViewChild, Renderer } from '@angular/core';
import { SimpleComponent, ComponentEvent } from '../component';
import { Countries } from './countries.model';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { elementClass } from '@angular/core/src/render3/instructions';
import { ISimpleMessage } from '../../data/model/IMessage';
import { Events } from 'ionic-angular';

/**
 * Generated class for the CountrySelectionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'country-selection',
  templateUrl: 'country-selection.html'
})
export class CountrySelectionComponent extends SimpleComponent{

    @ViewChild('listContainer') listContainer: ElementRef;
    @ViewChild('messageBox') messageBox: ElementRef;

    searchString: string = "";
    model: Countries = new Countries();
    text: string;
    countries: any[] = [];
    parent: HTMLElement;
    
    constructor(public elementRef: ElementRef,
        private renderer: Renderer,
        private events: Events) {

        super(elementRef);
        this.tag = "CountrySelectionComponent";
        //this.countryList = this.model.countryList;
    }

    ngOnInit() {
        // Override modal scrolling
        this.parent = document.getElementById("modalContent");
        if (undefined != this.parent) {
            let scroller: HTMLElement = <HTMLElement> this.parent.getElementsByClassName("scroll-content").item(0);
            if (undefined != scroller)
                scroller.style.overflowY = "hidden";

            // Adjust height for modal display
            this.renderer.setElementStyle(this.listContainer.nativeElement, "height", scroller.clientHeight - 118 + "px");
        }
        else {
           // Adjust height for modal display
           this.renderer.setElementStyle(this.listContainer.nativeElement, "height", 400 + "px");
        }

        
       this.search();
    }

    search() {
        this.countries = this.model.filter(this.searchString);
        this.debug(this.countries.length);
    }

    onSelect(event) {
        let target = event.target || event.srcElement || event.currentTarget;
      
        this.debug("Select event " + target.id);

        let countryName =  this.model.countryStringForCode(target.id);
        let result: ISimpleMessage = { title: countryName , payload: target.id + "|" + countryName };
        this.events.publish(ComponentEvent.ACTION_EVENT, result, this.componentId);
        this.destroy();
    }

}
