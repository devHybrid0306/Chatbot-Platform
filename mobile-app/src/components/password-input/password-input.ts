import { Component, Input, ElementRef } from '@angular/core';
import { SimpleComponent, IComponentData, ComponentEvent } from '../component';
import { ISimpleMessage } from '../../data/model/IMessage';
import { Events, ToastController } from 'ionic-angular';

/**
 * Generated class for the PasswordInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'password-input',
  templateUrl: 'password-input.html'
})  
export class PasswordInputComponent extends SimpleComponent {
    @Input() password: string;
    @Input() passwordRetype: string;

    constructor(public elementRef: ElementRef,
        private events: Events,
        private toastController: ToastController) {
        super(elementRef);
        this.componentId = this.tag = "PasswordInputComponent";
    }


    onSetPassword() {
        if (this.password === this.passwordRetype) {
            let result: ISimpleMessage = { title: "done", payload: this.password };
            this.events.publish(ComponentEvent.ACTION_EVENT, result, this.componentId);
        }
        else {
            this.showToast("Passwords don't match, please try again.", 2000);
        }
    }

    async showToast(message: string, duration: number) {
        const toast = await this.toastController.create({
            message: message,
            duration: duration
        });
        toast.present();
    }
}


