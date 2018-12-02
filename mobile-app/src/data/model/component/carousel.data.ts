import { IAttachmentBody } from '../IMessage';
import { ComponentItem } from '../../message.component.item';
import { MessageComponentItemFactory } from '../../message.component.item.factory';
import { IComponentItem, IComponent, IComponentData } from '../../../components/component';
import { ICarouselComponentData, CarouselComponent } from '../../../components/carousel/carousel';
import { Log } from '../../../util/logger';
import { Type } from '@angular/core';
import { ImageCardComponent } from '../../../components/image-card/image-card';
import { ImageCardData } from './imagecard.data';
import { SelectionCardData } from './selectioncard.data';
import { VideoCardComponent } from '../../../components/video-card/video-card';
import { SelectionCardComponent } from '../../../components/selection-card/selection-card';
import { MultiSelectCardComponent } from '../../../components/multi-select-card/multi-select-card';


export class CarouselData implements ICarouselComponentData {
    text: string;
    carouselItems: IComponentItem[] = [];
    tag: number;
    title: string;
    log: Log = new Log();

    constructor(public content: IAttachmentBody[],
        private factory: MessageComponentItemFactory) {
        this.parse();
    }

    parse() {
        for (let attachment of this.content) {
            this.log.d("CarouselData", this.content);
            let componentItem = this.componentItem(attachment);
            this.carouselItems.push(componentItem);
        }
    }


    componentItem(attachment: IAttachmentBody): ComponentItem {
     
        let component: Type<IComponent>;
        let data: IComponentData;
        // get content type
        let contentType: string = attachment.contentType;

        this.log.d("CarouselData - contentType", contentType);

        // get component for content type
        switch(contentType) {
            
            case "vidCard":
                component = VideoCardComponent;
                data = new ImageCardData(attachment);
                break;
            case "selectionCard":
                component = SelectionCardComponent;
                data = new SelectionCardData(attachment);
                break;
            case "multiSelectCard":
                component = MultiSelectCardComponent;
                data = new SelectionCardData(attachment);
                break;
            case "list":
                break;
            case "imgCard":
            default:
                
        this.log.d("CarouselData - defaulting to imagecard", null);

                component = ImageCardComponent;
                data = new ImageCardData(attachment);
                break;
                         
        }
        // return a component item
        return new ComponentItem(component, data, 2);
    }

}
