import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Item, Modal, ModalController, Events } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { Log } from '../../util/logger';
import { Message, ISimpleMessage } from '../../data/model/IMessage';
import { MainPageViewModel } from './viewmodel/main.page.viewmodel';
import { IAskMeFragmentListener } from '../fragments/askme.fragment/askme-fragment';
import { ILoginPageListener, LoginPage } from '../login/login';
import { MessageRepository } from '../../data/message.repository';
import { Page } from '../base.page';
import { ProfilePage } from '../profile/profile';



/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage extends Page implements IAskMeFragmentListener, ILoginPageListener {
    viewModel: MainPageViewModel;
    loginModal: Modal;

    // Exposing self for binding
    self: MainPage;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private modal: ModalController,
        protected events: Events) {
            super(events, navCtrl);
            this.tag = "MainPage";

            // Exposing this to be bound to an element.
            this.self = this;
            this.viewModel = new MainPageViewModel();
    }

    ionViewDidLoad() {
        this.debug('ionViewDidLoad MainPage');
        this.events.subscribe("LOGIN_DISMISS_EVENT", ()=>{
            this.onLoginDismiss();
        });


    }

    // IAskMeFragment delegate method.
    onAskMeItemSelect(itemId, payload) {
        this.debug(itemId);
        
        let id = itemId;
        this.debug("ID " + id);
        if (null != id) {
            let messages = payload;
            
            if (messages != null)
                this.navCtrl.push(ChatPage, {messages: messages});
         
        }
    }

    
    onLogin() {
        // do login logic here.
        this.loginModal = this.modal.create('LoginPage', {delegate: this});
        this.loginModal.present();
    }

    onLoginDismiss() {
        this.loginModal.dismiss();
        this.loginModal = null;
    }

    onLoginEvent(info: string) {
        this.debug("From login window " + info);
        if (!info.toLocaleLowerCase().includes('dashboard')) {
            let message = new Message(Message.MESSAGE_TYPE_USR, null);
            message.response.en = info;
            this.navCtrl.push(ChatPage, {messages: [message]});
        }
        else {
            this.navCtrl.push(ProfilePage);
        }
    }
}
