import { Component, ComponentFactoryResolver, Renderer, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import { SimpleComponent, IComponentData, IComponentItem, IComponent } from '../component';
import { Events } from 'ionic-angular';

/**
 * Generated class for the CarouselComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'carousel',
  templateUrl: 'carousel.html'
})
export class CarouselComponent extends SimpleComponent {
    @ViewChild("itemContainer", { read: ViewContainerRef }) itemContainer: ViewContainerRef;

    constructor(
        private resolver: ComponentFactoryResolver,
        private events: Events,
        private renderer: Renderer,
        public elementRef: ElementRef) {
        
        super(elementRef);
        this.componentId = this.className = "CarouselComponent";

    }

    ngAfterContentInit() {
        this.render();
    }

    render(): void {
        let data: ICarouselComponentData = <ICarouselComponentData> this.componentData;
        this.debug("data - " + data.carouselItems);
        if (data != undefined) {
            let items = data.carouselItems;
            this.debug("Resolver - " + this.resolver);
            for (let item of items) {
                this.debug("item " + item.component);
                
                var componentFactory = this.resolver.resolveComponentFactory(item.component);
                var componentRef = this.itemContainer.createComponent(componentFactory);
       
                (<IComponent>componentRef.instance).componentData = item.componentData;
               
                
            }
        }
    }
}

export interface ICarouselComponentData extends IComponentData {
    carouselItems: IComponentItem[];
}
