import { 
    Component, 
    ViewChild, 
    ElementRef, 
    Renderer,
    Input
} from '@angular/core';

import { 
    NavController, 
    AlertController, 
    Events, 
    Content,
    ModalController,
    Modal,
    PopoverController
} from 'ionic-angular';
import { IMessage, Message } from '../../data/model/IMessage';
import { MOCK_RESPONSE, MOCK_PASSWORD } from '../../data/model/mock-json-reference.json';
import { ChatWindowDirective } from '../../directives/chat-window/chat-window';
import { ChatWindowComponent } from '../../components/chat-window/chat-window';
import { ChatViewModel } from './viewmodel/chat.viewmodel';
import { MessageComponentItemFactory } from '../../data/message.component.item.factory';
import { NavParams } from 'ionic-angular';
import { AskmePage } from '../askme/askme';
import { Page } from '../base.page';


/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage extends Page {

    @ViewChild('container') container: ElementRef;
    @ViewChild('chatWindow') chatWindow: ChatWindowComponent;
    @ViewChild('header') headerBar: ElementRef;
    @ViewChild('actionPane') actionPane: ElementRef;
    @Input() inputMessage: string = "";

    message: IMessage;
    originalHeight: number;
    loginModal: Modal;
    //viewModel: ChatViewModel;
    componentFactory: MessageComponentItemFactory;

    constructor(public navCtrl: NavController,
        private navParams: NavParams,
        public alertController: AlertController,
        private modal:ModalController,
        private viewModel: ChatViewModel,
        protected events: Events,
        private renderer: Renderer,
        public popOverController: PopoverController) {
            super(events, navCtrl);
            this.tag = "ChatPage";

            // take the singleton message repository and inject it in the ChatViewModel
            //this.viewModel = new ChatViewModel(this.messageRepo);
            this.componentFactory = new MessageComponentItemFactory();
    }

    ionViewDidLoad() {
        this.debug("View did load");

        this.setupUI();
        setTimeout(()=>{
            this.setupInitialMessages();
        }, 1000);
       
        // Listen for login events.
        this.events.subscribe("LOGIN_EVENT", ()=>{
            this.onLogin();
        });

        this.events.subscribe("LOGIN_DISMISS_EVENT", ()=>{
            //this.onLoginDismiss();
        });

        this.events.subscribe("COMMAND_EVENT", (command)=> {
            this.debug("Command received, attempting to consume " + command);
            //this.onClose();
        })
    }

    

    
    setupInitialMessages() {
        let messages: Message[] = <Message[]> this.navParams.get('messages');
        if (null != messages) {
            for (let message of messages) {
                //this.viewModel.addMessage(message, message.messageType);
                this.viewModel.sendMessage(message.response.en);
                
            }
        }

    }



    // TEMPORARY
    setupUI() {
        this.renderer.setElementStyle(this.container.nativeElement, 'margin-top', '60px');
        this.renderer.setElementStyle(this.container.nativeElement, 'height', 'calc(100% - 60px)');

        this.renderer.setElementStyle(this.container.nativeElement, 'webkitTransition', 'margin-top 500ms');
        this.renderer.setElementStyle(this.container.nativeElement, 'webkitTransition', 'height 500ms');
 
    }

    onScrollInit(directive: ChatWindowDirective) {
        this.debug("Directive target " + directive.target);
        let headerHeight = directive.target.clientHeight;
        directive.renderer.setElementStyle(directive.target, 'webkitTransition', 'top 500ms');
    }

    onScroll(directive: ChatWindowDirective, event) {
        this.debug("Scroll event received ");
        if (!directive.isInitialized) {
            directive.initialize();
        }

        if (event['scrollTop'] != undefined) {
            if (event.scrollTop < 150) {
                directive.renderer.setElementStyle(directive.target, "top", "-56px");
            }
            else {
                directive.renderer.setElementStyle(directive.target, "top", "0px");
            }
        }
    }

    
    addMessage() {
        this.debug("Adding mock server response");
        // Mock message from the mock json provided by Hendrick.
        var message: Message = new Message(Message.MESSAGE_TYPE_BOT , MOCK_RESPONSE);
        //this.messageRepo.addMessage(message);
        this.viewModel.addMessage(message, 0);
     
    }

    sendMessage() {}

    


    async showPopover(event: any) {
        const popover = this.popOverController.create(AskmePage);
        
        popover.onDidDismiss((data, role)=>{
            if (null != data) {
                //this.navCtrl.push(ChatPage, {messages: data});
                this.chatWindow.clear();
                this.viewModel.clear();
                for (let message of data) {
                    this.viewModel.sendMessage(message.response.en);
                }
               
            }
        });

        return await popover.present({ev: event});
    }


    onClose() {
        this.navCtrl.pop();
    }

    onLogin() {
        // do login logic here.
        this.loginModal = this.modal.create('LoginPage');
        this.loginModal.present();
    }

    onLoginDismiss() {
        this.loginModal.dismiss();
        this.loginModal = null;
    }

    ngOnDestroy() {
        this.viewModel.clear();
    }
}
