import { IonicPage, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Log } from '../../../util/logger';
import { IModalDelegate } from '../../../components/chat-window/modal-container-page/modal-container';
import { QualificationsViewModel } from './viewmodel/qualifications.viewmodel';

@IonicPage()
@Component({
  selector: 'page-qualifications',
  templateUrl: 'qualifications.html',
})
export class QualificationsPage extends Log implements IModalDelegate {
   
    viewModel: QualificationsViewModel =  new QualificationsViewModel();

    constructor(private viewController: ViewController) {
        super();
        this.tag = "QualificationsPage";

    }

    onModalDismiss(message: any, sender: any) {
        throw new Error("Method not implemented.");
    }

    onClose() {
        this.viewController.dismiss();
    }

    onComplete() {
        this.viewController.dismiss(this.viewModel.getPayload());
    }
}