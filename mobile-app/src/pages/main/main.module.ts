import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainPage } from './main';
import { AskMeFragment } from '../fragments/askme.fragment/askme-fragment';

@NgModule({
  declarations: [
    MainPage,
    AskMeFragment
  ],
  imports: [
  
    IonicPageModule.forChild(MainPage),
  ],
  entryComponents: []
})
export class MainPageModule {}
