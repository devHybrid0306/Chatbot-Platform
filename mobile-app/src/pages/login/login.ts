import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController } from 'ionic-angular';
import { Log } from '../../util/logger';
import { LoginViewModel } from './viewmodel/login.viewmodel';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends Log {

    delegate: ILoginPageListener;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private events: Events,
    private viewModel: LoginViewModel,
    private toast: ToastController) {
        super();
        this.tag = "LoginPage";
        
        this.delegate = this.navParams.get('delegate');
  }

  ionViewDidLoad() {
    this.debug('ionViewDidLoad LoginPage');
  }

  dismiss() {
      this.events.publish("LOGIN_DISMISS_EVENT", null);
        this.delegate = null;
  }

  onLogin() {
    // do login
    this.debug("Logging in.");
    this.viewModel.doLogin((status)=>{
        this.toast.create({
            message: (status) ? 'Login successful' : 'Login failed.',
            duration: 3000,
            position: 'top'
          }).present();

         

          if (status) {
            this.delegate.onLoginEvent("dashboard");
            this.dismiss();
          }


    });
    //this.dismiss();
  }

  onForgotPassword() {
    this.debug("Forgot password");
    if (this.delegate != null) {
        this.delegate.onLoginEvent("forgot password");
    }
    this.dismiss();
  }

  onRegister() {
      this.debug("Register");
      if (this.delegate != null) {
          this.delegate.onLoginEvent("register");
      }
      this.dismiss();
  }


  onFBLogin() {
      this.debug("login to fb");
      if (this.delegate != null) {
        this.delegate.onLoginEvent("social media");
    }
    this.dismiss();
  }
}

export interface ILoginPageListener {
    onLoginEvent(info: string);
}