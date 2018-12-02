import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QualificationsPage } from './qualifications';



@NgModule({
  declarations: [
    QualificationsPage
    
    ],
  imports: [
    IonicPageModule.forChild(QualificationsPage),
  ],
})
export class QualificationsPageModule {}
