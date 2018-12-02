import {
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  Renderer,
  ElementRef
} from "@angular/core";


import { Content, Events, ModalController, Modal } from 'ionic-angular';
import { IComponent, IComponentItemFactory, ComponentEvent, IComponentItem } from '../component';
import { BehaviorSubject } from 'rxjs';
import { Log } from '../../util/logger';
import { ISimpleMessage } from "../../data/model/IMessage";
import { IModalDelegate } from './modal-container-page/modal-container';
import { ComponentFactory } from '@angular/core';


export const CHAT_WINDOW_POS_LEFT: number = 0;
export const CHAT_WINDOW_POS_RIGHT: number = 1;

export interface IChatWindowViewModel {
    messages: any[];
    messages$: BehaviorSubject<any>;
    sendMessage(message: any): void;
    addMessage(message: any, position: number): void;
    clear(): void;
}

/**
 * Generated class for the ComponentsChatWindowComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: "chat-window",
    templateUrl: "chat-window.html"
})

/**
 * ChatWindowComponent 
 * 
 * A UI interface for basic chatting. 
 */
export class ChatWindowComponent extends Log implements IModalDelegate {
    static MAIN_WINDOW_DISPLAY_INDEX: number = 0;
    static ACTION_PANE_DISPLAY_INDEX: number = 1;
    static MODAL_WINDOW_DISPLAY_INDEX: number = 2;
    static TEXT_INPUT_DISPLAY_INDEX: number = 3;

    //
    // HTML Element references
    //
    @ViewChild("messageContainer", { read: ViewContainerRef }) messageContainer;
    @ViewChild("actionContainer", { read: ViewContainerRef }) actionContainer;
    @ViewChild(Content) content: Content;
    @ViewChild("actionPane", {read: ElementRef}) actionPane: ElementRef;
    @ViewChild("textInputPane", {read: ElementRef}) textInputPane: ElementRef;
    @ViewChild("footer", {read: ElementRef}) footer: ElementRef;
    @ViewChild("contentContainer", {read: ElementRef}) contentContainer: ElementRef;
    //
    // Bindable properties.
    //
    @Input() inputMessage: string = "";
    @Input() target: HTMLElement;
    @Input() scrollExecuteBlock: Function;
    @Input() scrollInitExecuteBlock: Function;

    // Customizable injectable dependencies
    @Input() viewModel: IChatWindowViewModel;
    @Input() componentItemFactory: IComponentItemFactory;
    
     win: Element;
     actionPaneHeight: number = 65;
     footerHeight: number = 0;
     modalContainer: Modal;


    constructor(
        private resolver: ComponentFactoryResolver,
        private events: Events,
        private renderer: Renderer,
        public modalController: ModalController) {
            super();
            this.tag = "ChatWindow";

            this.subscribeToEvents();
    }

    ngOnInit() {
        // Select this parent's view and set it's style to overflow hidden.
        this.win = document.getElementById("messageContentScrollView");
        this.win.parentElement.parentElement.style.overflowY = "hidden";

        if (this.viewModel != undefined) {
            // Subscribe to message changes provided by the repo.
            this.viewModel.messages$.subscribe(messages => {
                this.debug("NEW MESSAGE RECEIVED");
                //this.messages = messages;
                this.update(messages);
                
                if (null != this.scrollToBottom)
                    this.scrollToBottom();
            });
        }
        else {
            this.error("No view model defined.");
        }

        this.debug(this.actionPane.nativeElement + " -- action Pane");
        this.setupUI();
    }

    ngOnDestroy() {
        
        this.debug("onDestroy() called");
        this.debug("Unsubscribing from events.");

        this.unsubscribeFromEvents();
    }


    /**
     * Handles subscription to events.
     */
    private subscribeToEvents() {
         // Register as event listener for quick action
         this.events.subscribe(ComponentEvent.ACTION_EVENT, (message, time) => {
            let payload: ISimpleMessage = <ISimpleMessage> message;
            this.debug("event received: " + payload.payload);
            
            this.viewModel.addMessage(payload.title, CHAT_WINDOW_POS_RIGHT);
            this.viewModel.sendMessage(payload.payload);

            this.showActionPane(false);
        });
    }

    /**
     * Unsubscibes from events.
     */
    private unsubscribeFromEvents() {
        this.events.unsubscribe(ComponentEvent.ACTION_EVENT, null);
    }


    /**
     * Handles auto scrolling to bottom.
     */
    private scrollToBottom() {
        if (this.content._scroll != undefined) {
          
            this.content.scrollToBottom(100).then((result)=> {
                this.debug(this.content.scrollToBottom);
                        
                if (this.content.scrollToBottom != null 
                    && this.content.scrollToBottom != undefined) {
                    this.content.scrollToBottom(100);
                }
            });
            
        }
    }

    /**
     * Setup the initial UI states and animation hooks.
     */
    private setupUI() {
        // Setup animation

        // Quick Action panel
        this.renderer.setElementStyle(this.actionPane.nativeElement, 'webkitTransition', 'height 500ms');
        this.renderer.setElementStyle(this.actionPane.nativeElement, 'webkitTransition', 'bottom 500ms');
        
        // Content container / main chat window panel
        this.renderer.setElementStyle(this.content.getNativeElement(), 'webkitTransition', 'height 500ms');
        this.renderer.setElementStyle(this.contentContainer.nativeElement, 'webkitTransition', 'height 500ms');

        // Footer and Text input panel
        this.renderer.setElementStyle(this.textInputPane.nativeElement, 'webkitTransition', 'top 500ms');
        this.renderer.setElementStyle(this.footer.nativeElement, 'webkitTransition', 'bottom 500ms');


        // initial state
        this.renderer.setElementStyle(this.actionPane.nativeElement, 'height', '0px');
        this.renderer.setElementStyle(this.content.getNativeElement(), 'height', '100%');
        this.renderer.setElementStyle(this.contentContainer.nativeElement, 'height', '100%');

        this.renderer.setElementStyle(this.textInputPane.nativeElement, 'top', '0px');
        this.renderer.setElementStyle(this.footer.nativeElement, 'bottom', '0px');

        this.showTextInputPane(true);
    }

    /**
     * Shows and hides the chat text input field at the bottom of the window.
     * 
     * @param show boolean - set true to show, false to hide.
     */
    public showTextInputPane(show: boolean): void {
        const footerPane = this.footer.nativeElement;
        this.footerHeight = (show) ? 56 : 0;

        this.debug("Footer pane height: " + this.footerHeight);
        if (show) {
            this.renderer.setElementStyle(footerPane, 'bottom', '0px');
           
        }
        else {
            this.renderer.setElementStyle(footerPane, 'bottom',  '-' + this.actionPaneHeight + 'px');
           
        }
        this.renderer.setElementStyle(this.contentContainer.nativeElement, 'height', 'calc(100% - '+ this.footerHeight +'px');
        
        setTimeout(()=>{
            // Scroll content to bottom to compensate on dimension changes.
            
            if (null != this.scrollToBottom)
                this.scrollToBottom();
        }, 500);
    }

    private getTotalChildrenHeight(element: any): number {
        var result: number = 0;
        if (undefined != element['children']) {
            let count = element.children.length;
            for (var i=0; i < count; i++) {
                let child = element.children[i];
                this.debug(i + " ::: " + child.clientHeight);
                result += parseInt(child.clientHeight);
            }
        }
        this.debug("height sum: " + result);

        return (result == 0) ?this.actionPaneHeight : result;
    }

    /**
     * Shows / hides the action pane that holds any action type of components.
     * 
     * @param show 
     */
    private showActionPane(show: boolean, singleItem: boolean = false): void {
        
        //this.showTextInputPane(!show);

        if (show) {
            let localHeight = this.getTotalChildrenHeight(this.actionPane.nativeElement);
            this.debug("Showing action pane with client height " + localHeight);
           
            // trigger show animation
            this.renderer.setElementStyle(this.actionPane.nativeElement, 'height',  localHeight + 'px');
            this.renderer.setElementStyle(this.contentContainer.nativeElement, 'height', 'calc(100% - '+ (localHeight + this.footerHeight) +'px');
            this.renderer.setElementStyle(this.actionPane.nativeElement, 'bottom', '0px');

        }
        else {
            this.debug("Hiding action pane");
            // trigger hide animation
            this.renderer.setElementStyle(this.actionPane.nativeElement, 'height', '0px');
            this.renderer.setElementStyle(this.contentContainer.nativeElement, 'height', 'calc(100% - '+ (this.footerHeight) +'px');
            this.renderer.setElementStyle(this.actionPane.nativeElement, 'bottom', -this.actionPaneHeight + 'px');
        }

        if (singleItem) {
            this.renderer.setElementStyle(this.actionPane.nativeElement, 'display', 'block');
        }
        else {
            this.renderer.setElementStyle(this.actionPane.nativeElement, 'display', 'flex');
        }

        setTimeout(()=>{
            // Scroll content to bottom to compensate on dimension changes.
            
            if (null != this.scrollToBottom)
            this.scrollToBottom();
        }, 500);
       
    }

    
    /**
     * Returns the list of currently rendered messages.
     * 
     * @returns Message[] - an array of Message objects.
     */
    getMessages(): any[] {
        return this.viewModel.messages;
    }



    /**
     * Sends the string value of the chat text input field to the server.
     */
    sendMessage(): void {
        if (this.viewModel != undefined) {
            this.debug("Sending : " + this.inputMessage);
            // position to right since send message is a user action.
            this.viewModel.addMessage(this.inputMessage, CHAT_WINDOW_POS_RIGHT); 
            this.viewModel.sendMessage(this.inputMessage);
            this.inputMessage = "";
        }
        else {
            this.error("No view model defined.");
        }
    }

    clear(): void {
        this.messageContainer.clear();
        this.actionContainer.clear();
    }


    /**
     * Loads all messages in the cache list.
     */
    loadAllMessages(): void {
        if (this.viewModel != undefined) {
            let messages: any[] = this.viewModel.messages;
            this.messageContainer.clear();
            for (let message of messages) {
                this.renderMessage(message);
            }
        }
        else {
            this.error("No view model defined.");
        }
    }


    /**
     * Updates the messages displayed on the chat window.
     * 
     * @param messages any[] - array of message data.
     */
    update(messages: any[]): void {
        this.debug("updating chat screen");
        let message = messages[messages.length-1];
        this.renderMessage(message);
        
    }


    private renderMessage(message: any): void {

        if (undefined == this.componentItemFactory) {
            this.error("No component factory defined.");
            return;
        }

       

        if (message != undefined) {
            let items = this.componentItemFactory.componentItem(message);
            var modalComponents: IComponentItem[] = [];

            for (let item of items) {

                if (item.displayIndex == ChatWindowComponent.TEXT_INPUT_DISPLAY_INDEX) {
                    this.showTextInputPane(true);
                }
                
                if (item.displayIndex == ChatWindowComponent.MODAL_WINDOW_DISPLAY_INDEX) {
                    this.debug("Component factory in chat window " + componentFactory);
                    modalComponents.push(item);
                    continue;
                }

                var componentFactory = this.resolver.resolveComponentFactory(item.component);
                var componentRef = null;
                

                // TODO: need to change to a non specific identifier for the action container
                if (item.displayIndex == ChatWindowComponent.ACTION_PANE_DISPLAY_INDEX) {
                    this.debug("Found an action component ");

                    this.actionContainer.clear();
                    componentRef = this.actionContainer.createComponent(componentFactory);
                    
                    this.debug("Component height " + componentRef);
                    //this.showTextInputPane(false);
                    setTimeout(()=>{
                        this.showActionPane(true);
                    }, 500);
                   
                }
                else if (item.displayIndex == ChatWindowComponent.MAIN_WINDOW_DISPLAY_INDEX) {
                    componentRef = this.messageContainer.createComponent(componentFactory);
                  
                    this.showActionPane(false);
                }
             

                this.debug("has title: " + typeof item.componentData.content);
                (<IComponent>componentRef.instance).componentData = item.componentData;
            }

            // Components are flagged as modal, display them in modal window
            if (modalComponents.length > 0) {
                this.showComponentsInModal(modalComponents);
            }
        }

    }


    showComponentsInModal(componentItems: IComponentItem[]) {
        this.modalContainer = this.modalController.create('ModalContainerPage', 
            {
                delegate: this, 
                title: (componentItems.length > 0) ? componentItems[0].componentData.title : "", 
                componentItems: componentItems
            });
          
        this.modalContainer.present();
    }




    // Modal delegate methods
    onModalDismiss() {
        if (this.modalContainer != undefined) {
            this.modalContainer.dismiss();
        }
    }
}

