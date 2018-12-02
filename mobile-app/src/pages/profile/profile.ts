import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal, DateTime, PopoverController } from 'ionic-angular';
import { IComponentItem, IComponentData } from '../../components/component';
import { Log } from '../../util/logger';
import { IModalDelegate } from '../../components/chat-window/modal-container-page/modal-container';
import { ComponentItem } from '../../data/message.component.item';
import { CountrySelectionComponent } from '../../components/country-selection/country-selection';
import { MultiSelectCardComponent } from '../../components/multi-select-card/multi-select-card';
import { SelectionCardData } from '../../data/model/component/selectioncard.data';
import { IAttachmentBody } from '../../data/model/IMessage';
import { ProfileViewModel } from './viewmodel/profile.viewmodel';
import { AskmePage } from '../askme/askme';
import { AskMeFragment } from '../fragments/askme.fragment/askme-fragment';
import { ChatPage } from '../chat/chat';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage extends Log implements IModalDelegate {
    @ViewChild(DateTime) datePicker: DateTime;

    modal: Modal;

    constructor(public navCtrl: NavController, 
        public navParams: NavParams,
        private modalCtrl: ModalController,
        public viewModel: ProfileViewModel,
        private popoverCtrl: PopoverController) {
            super();
            this.tag = "ProfilePage";
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProfilePage');
        this.viewModel.getProfile();
    }

    showModal(componentItem: IComponentItem) {
        this.debug("Show modal");
        this.modal = this.modalCtrl.create('ModalContainerPage', 
        {
            delegate: this, 
            title: componentItem.componentData.title, 
            componentItems: [componentItem]
        });
        this.modal.present();
    }



    onModalDismiss(message: any, sender: any) {
        this.debug("Modal dismissed " + message + " from " + sender);

        switch(sender) {
            case "country":
                this.viewModel.profile.country = message.payload;
                break;
            case "language":
                this.viewModel.profile.preferredlanguage = message.payload;
                break;
            default:
                break;
        }
        this.viewModel.saveProfile();

        this.modal.dismiss();
        this.modal = null;
    }


    
    onBirthSave() {
        this.debug("Date set: " + this.datePicker.value.month);
    
        this.viewModel.profile.age = this.datePicker.value.month + " " + this.datePicker.value.year;
    }

    onClick(event) {
        this.datePicker.open();
    }

    onCountryChange(event) {
        
    }





    selectCountry() {
        let componentData: IComponentData = <IComponentData> {title: "Country", tag: null, content:null};
        let componentItem = new ComponentItem(CountrySelectionComponent, componentData, 3);
        componentItem.componentId = "country";
        this.showModal(componentItem);
    }


    selectLanguage() {
        let componentItem = new ComponentItem(MultiSelectCardComponent, this.viewModel.componentDataForLanguages(), 3);
        componentItem.componentId = "language";
        this.showModal(componentItem);
    }

    showQualifications() {
        // show modal 
        let modal = this.modalCtrl.create("QualificationsPage", {viewModel: this.viewModel});
        modal.onDidDismiss((data, role)=>{
            this.viewModel.profile['ifhsgrad'] = (data.ifhshsgrad) ? (data.ifunivgrad) ? 'College degree' : data.coursecerttaken : this.viewModel.profile['ifhsgrad'];
            this.viewModel.profile['coursecerttaken'] = data.coursecerttaken;
            this.viewModel.profile['skullsacquisition'] = data.skillsacquisition;
            this.viewModel.saveProfile();
            this.viewModel.getProfile();
        });
        modal.present();
    }


    async showPopover(event: any) {
        const popover = this.popoverCtrl.create(AskmePage);
        
        popover.onDidDismiss((data, role)=>{
            if (null != data) {
                this.navCtrl.push(ChatPage, {messages: data});
            }
        });

        return await popover.present({ev: event});
    }
}
