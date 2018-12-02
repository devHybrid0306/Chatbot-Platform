import { Component, ElementRef } from '@angular/core';
import { SimpleComponent, IComponentData, ComponentEvent } from '../component';
import { Events } from 'ionic-angular';

/**
 * Generated class for the LoginBannerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login-banner',
  templateUrl: 'login-banner.html'
})
export class LoginBannerComponent extends SimpleComponent{
    header: string;
    text: string;

    constructor(private events:Events, public elementRef: ElementRef) {
        super(elementRef);
        this.className = "LoginBannerComponent";

        
    }

    onLogin() {
        this.events.publish("LOGIN_EVENT", null);
    }


}


export interface ILoginBannerData extends IComponentData {
    header: string;
    text: string;

}