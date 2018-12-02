import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';
import { AskMeFragment } from '../fragments/askme.fragment/askme-fragment';
import { AskmePage } from '../askme/askme';
import { AskmePageModule } from '../askme/askme.module';

@NgModule({
  declarations: [
    ChatPage,
    AskmePage
  ],
  imports: [
    AskmePageModule,
    IonicPageModule.forChild(ChatPage),
  ],
  entryComponents: [AskMeFragment]
})
export class ChatPageModule {}
