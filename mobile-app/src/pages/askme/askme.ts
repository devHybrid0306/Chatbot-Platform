import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { IAskMeFragmentListener, AskMeFragment } from '../fragments/askme.fragment/askme-fragment';
import { Log } from '../../util/logger';
import { AskMeViewModel } from '../fragments/askme.fragment/viewmodel/askme-fragment-viewmodel';

/**
 * Generated class for the AskmePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-askme',
  templateUrl: 'askme.html',
})
export class AskmePage extends Log implements IAskMeFragmentListener {
    @ViewChild("askmeFragment") askmeFragment: AskMeFragment;

    delegate: IAskMeFragmentListener;
    self: IAskMeFragmentListener;

    constructor(public navCtrl: NavController, 
        public navParams: NavParams,
        private viewController: ViewController) {

            super();
            this.tag = "AskmePage";
            
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AskmePage');
        this.self = this;
    }

    close() {
        this.viewController.dismiss();
    }

    onAskMeItemSelect(itemId, payload) {
        if (null != payload) {
            this.viewController.dismiss(payload);
        }
  
    }


}
