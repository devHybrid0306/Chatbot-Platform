import { Component, ViewChild, ViewContainerRef, ComponentRef, ComponentFactory, Renderer, ComponentFactoryResolver } from '@angular/core';
import { IonicPage, NavParams, Events } from 'ionic-angular';
import { Log } from '../../../util/logger';
import { IComponent, IComponentItem, ComponentEvent } from '../../component';

@IonicPage()
@Component( {
    selector: "modal-container",
    templateUrl: "modal-container.html"
})
export class ModalContainerPage extends Log {
    @ViewChild('componentContainer', { read: ViewContainerRef }) componentContainer: ViewContainerRef;

    private delegate: IModalDelegate;
    title: string;
    componentFactory: ComponentFactory<IComponent>;
    componentItems: IComponentItem[] = [];

    constructor(
        private events: Events,
        private params: NavParams,
        private renderer: Renderer,
        private factoryResolver: ComponentFactoryResolver
        ) {
        super();
        this.tag = "ModalContainerPage";
         
    }

    ionViewDidLoad() {
        this.subscribeToEvents();
        this.delegate = <IModalDelegate> this.params.get("delegate");
        this.title = this.params.get('title');
        this.componentItems = <IComponentItem[]> this.params.get('componentItems');
        this.debug(this.componentItems.length);
        this.showComponents();
    }

    private subscribeToEvents() {
        // Register as event listener for quick action
        this.events.subscribe(ComponentEvent.ACTION_EVENT, (message, sender) => {
            this.debug("Dismissing modal");
            this.dismiss(message, sender);
            this.events.unsubscribe(ComponentEvent.ACTION_EVENT);
        });
    }


    showComponents() {
        this.debug("Component Item count " + this.componentItems.length);
 
        for (let item of this.componentItems) {

            var componentFactory = this.factoryResolver.resolveComponentFactory(item.component);
            let componentRef = this.componentContainer.createComponent(componentFactory);
            
            let component: IComponent =  (<IComponent>componentRef.instance);
            component.componentData = item.componentData;
            component.componentId = item.componentId;

        }
    }


    dismiss(message: any, sender: any) {
        if (undefined != this.delegate) {
            this.debug("Dismissing modal");
           
            this.componentContainer.clear();
            this.delegate.onModalDismiss(message, sender);
        }
    }
}

export interface IModalDelegate {
    onModalDismiss(message: any, sender: any);
}
