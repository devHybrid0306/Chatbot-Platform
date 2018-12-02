import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { QualificationsPage } from './qualifications/qualifications';

@NgModule({
  declarations: [
    ProfilePage,
    QualificationsPage
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
  ],
})
export class ProfilePageModule {}
