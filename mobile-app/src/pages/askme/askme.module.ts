import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AskmePage } from './askme';
import { AskMeFragment } from '../fragments/askme.fragment/askme-fragment';


@NgModule({
  declarations: [
    AskmePage,
    AskMeFragment
  ],
  imports: [
    IonicPageModule.forChild(AskmePage),
  ],
})
export class AskmePageModule {}
