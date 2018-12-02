import { Type } from '@angular/core';
import { IComponent, IComponentData, IComponentItem } from '../components/component';


export class ComponentItem implements IComponentItem {
    componentId: string;
    constructor(
        public component: Type<IComponent>,
        public componentData: IComponentData,
        public displayIndex: number = 0
    ){}
}