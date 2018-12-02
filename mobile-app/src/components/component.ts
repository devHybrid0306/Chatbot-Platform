import { Log } from '../util/logger';
import { Type, ElementRef } from '@angular/core';



export interface IComponentData {
    tag: number;
    title: string;
    content: any;
    parse();
}


export interface IComponent {
    componentData: IComponentData;
    type: number;
    tag: any;
    className: string;
    elementRef: ElementRef;
    componentId: string;
}


export interface IComponentEvent {
    eventName: string;
    sender: IComponent;
    payload: any;
}


export interface IComponentItem {
    component: Type<IComponent>;
    componentData: IComponentData;
    componentId: string;
    displayIndex: number;
}


export interface IComponentItemFactory {
    componentItem(data: any): IComponentItem[];
}



// Concrete implementation of interfaces


export class ComponentEvent implements IComponentEvent {
    static CLICK_EVENT: string = "CLICK_EVENT";
    static ACTION_EVENT: string = "ACTION_EVENT";

    constructor(
        public eventName: string,
        public sender: IComponent,
        public payload: any) {}

}


export abstract class SimpleComponent extends Log implements IComponent {
    componentData: IComponentData;
    type: number;
    tag: any;
    className: string = "SimpleComponent";
    log: Log;
    isEnabled: boolean = true;
    componentId: string = "SimpleComponent";

    constructor(public elementRef: ElementRef) {
        super();
        this.log = new Log();
    }

    destroy() {
        this.elementRef.nativeElement.remove();
    }

}