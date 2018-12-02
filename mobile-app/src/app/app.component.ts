import { Component, enableProdMode, Type } from '@angular/core';
import { Platform, Events, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MainPage } from '../pages/main/main';
import { ChatPage } from '../pages/chat/chat';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})

export class SmartBot {
    static CHANGE_ROOT_PAGE_EVENT: string = "CHANGE_ROOT_PAGE_EVENT";

    rootPage:any = MainPage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
        private events: Events) {

        platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
        
            this.events.subscribe(SmartBot.CHANGE_ROOT_PAGE_EVENT, (pageName)=>{
                this.setRoot(pageName);
            });

        });
    }

    private setRoot(name: string)
    {
        switch(name) {
            case "dashboard":
                this.rootPage = DashboardPage;
                break;
            case "chat":
                this.rootPage = ChatPage;
                break;
            case "main":
            default:
                this.rootPage = MainPage;
                break;
        }
       
    }
 
}

