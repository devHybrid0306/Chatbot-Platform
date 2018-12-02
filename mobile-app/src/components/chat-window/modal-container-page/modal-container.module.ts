import { ModalContainerPage } from './modal-container';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
@NgModule({
    declarations: [
      ModalContainerPage
    ],
    imports: [
      
      IonicPageModule.forChild(ModalContainerPage),
    ],
    entryComponents: []
  })
  export class ModalContainerModule {}