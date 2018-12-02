import { ComponentItem } from './message.component.item';
import { Message, IAttachment, IAttachmentBody } from './model/IMessage';
import { Injectable, Type } from '@angular/core';
import { SimpleMessageComponent } from '../components/simple-message/simple-message';
import { QuickActionComponent } from '../components/quick-action/quick-action';
import { ImageCardComponent } from '../components/image-card/image-card';
import { MessageComponentData } from './model/component/message.data';
import { Log } from '../util/logger';
import { IComponentItemFactory, IComponent, IComponentData } from '../components/component';
import { BlockButtonComponent } from '../components/block-button/block-button';
import { SelectionCardComponent } from '../components/selection-card/selection-card';
import { VideoCardComponent } from '../components/video-card/video-card';
import { MultiSelectCardComponent } from '../components/multi-select-card/multi-select-card';
import { CarouselComponent } from '../components/carousel/carousel';
import { CarouselData } from './model/component/carousel.data';
import { QuickActionMessageData } from './model/component/quickaction.data';
import { ImageCardData } from './model/component/imagecard.data';
import { SelectionCardData } from './model/component/selectioncard.data';
import { ButtonData } from './model/component/button.data';
import { PasswordInputComponent } from '../components/password-input/password-input';
import { SelectionChipsComponent } from '../components/selection-chips/selection-chips';
import { DatePickerComponent } from '../components/date-picker/date-picker';
import { CountrySelectionComponent } from '../components/country-selection/country-selection';


@Injectable()
export class MessageComponentItemFactory 
    extends Log 
    implements IComponentItemFactory {

    constructor() {
        super();
        this.tag = "MessageComponentItemFactory";
    }
    /**
     * Returns the component item for a given message json string.
     * 
     * @param message JSON string
     * @returns MessageComponentItem
     */
    componentItem(message: Message): ComponentItem[] {
        var messageComponent: ComponentItem[] = [];
       
        if (undefined != message.system.info && undefined != message.system.contentType) {
             
            this.debug(message.messageType);

            // if (message.system.contentType == 'banner') {
            //     this.debug("banner info: " + message.system.info);
            //     let loginBannerData: LoginBannerComponentData = new LoginBannerComponentData(message.system);
            //     messageComponent.push(new ComponentItem(LoginBannerComponent, loginBannerData));
            // }
            
        }



        if (undefined != message.response && null != message.response) {
           

            //messageComponent.push(new MessageComponentItem(SimpleMessageComponent, message, 0));
            let simpleMessageData: MessageComponentData = new MessageComponentData(message);
            if (message.response.en) {
                messageComponent.push(new ComponentItem(SimpleMessageComponent, simpleMessageData));
            }
            
            // Attachments
            if (undefined != message.response.attachments) {
                if (message.response.attachments.length > 0) {
                    for (var i = 0; i < message.response.attachments.length; i++) {
                        let attachment: IAttachment = message.response.attachments[i];
                        let componentItems: ComponentItem[] = this.handleAttachment(attachment);
                        
                        this.debug("Component items " + componentItems.length);
                        
                        messageComponent = messageComponent.concat(componentItems);
                    }
                }
            }

            // // Quick Replies
            if (null != message.response.quick_replies 
                || null != message.response.custom_content) {
               
                    if (message.response.quick_replies.length > 0) {
                        this.debug("quick replies ");
                        let quickActionData: QuickActionMessageData = new QuickActionMessageData(message);
                        messageComponent.push(new ComponentItem(QuickActionComponent, quickActionData, 1));
                    }
                
            }

        }
        this.debug("Message Components " + messageComponent.length);
        return messageComponent;
    }


    handleAttachment(attachment: IAttachment): ComponentItem[] {
        let result: ComponentItem[];
        let component: Type<IComponent>;
        let data: Type<IComponentData>;
        // get content type
        let contentType: string = attachment.contentType;
        // get component for content type
        switch(contentType) {
            case "imgCard":
                component = ImageCardComponent;
                data = ImageCardData;
                break;
            case "vidCard":
                component = VideoCardComponent;
                data = ImageCardData;
                break;
            case "selectionCard":
                component = SelectionCardComponent;
                data = SelectionCardData;
                break;
            case "selectionChips":
                component = SelectionChipsComponent;
                data = SelectionCardData;
                break;
            case "multiSelectCard":
                component = MultiSelectCardComponent;
                data = SelectionCardData;
                break;
            case "carousel":
                component = CarouselComponent;
                data = CarouselData;
                break;
            case "button":
                component = BlockButtonComponent;
                data = ButtonData;
                break;
            case "passwordCard":
                component = PasswordInputComponent;
                data = ButtonData;
                break;
            case "countrySelection":
                component = CountrySelectionComponent;
                data = ButtonData;
                break;
            case "datePicker":
                component = DatePickerComponent;
                data = ButtonData;
                break;
            case "list":
                break;
            default:
                return[];
                
        }
        // return a component item
        return this.processComponent(component, data, attachment);;
    }


    private processComponent(component: Type<IComponent>, 
        componentData: Type<IComponentData>, 
        attachment: IAttachment): ComponentItem[] {

        this.debug("Parsing for " + component);

        var result: ComponentItem[] = [];
        let componentTemp = new component();
        let mode = this.getMode(attachment.mode);

        if (componentTemp.className != "CarouselComponent") {
            if (attachment.body != null && attachment.body != undefined) {
                for (let body of attachment.body) {
                    this.debug("BODY " + body);
                    let data: IComponentData = new componentData(body);
                    result.push(new ComponentItem(component, data, mode));
                }
            }
            else {
                // fail safe routine
                result.push(new ComponentItem(component, new componentData([]), mode));
            }
        }
        else {
            let data: IComponentData = new componentData(attachment.body);
            result.push(new ComponentItem(component, data, mode));
        }
        
        return result;
    }


    private getMode(modeName: string): number {
        switch(modeName) {
            case "action":
                return 1;
            case "modal":
                return 2;
            case "textInput":
                return 3;
            default: 
                return 0;
        }
    }
    

}