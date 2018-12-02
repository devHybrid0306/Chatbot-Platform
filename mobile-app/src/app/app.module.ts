import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, DeepLinkConfig } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { SmartBot } from './app.component';
import { ComponentsModule } from '../components/components.module';
import { MessageRepository } from '../data/message.repository'

import { ChatBotProvider } from '../providers/chat-bot/chat-bot';
import { WebSocketServiceProvider } from '../providers/web-socket-service/web-socket-service';
import { MockChatBotProvider } from '../providers/mock-chat-bot/mock-chat-bot';
import { MessageComponentProvider } from '../providers/message-component/message-component';
import { MessageComponentItemFactory } from '../data/message.component.item.factory';
import { SimpleMessageComponent } from '../components/simple-message/simple-message';
import { QuickActionComponent } from '../components/quick-action/quick-action';
import { ImageCardComponent } from '../components/image-card/image-card';
import { LoginBannerComponent } from '../components/login-banner/login-banner';
import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
import { MainPage } from '../pages/main/main';
import { ChatPage } from '../pages/chat/chat';
import { Log } from '../util/logger';
import { BlockButtonComponent } from '../components/block-button/block-button';
import { SelectionCardComponent } from '../components/selection-card/selection-card';
import { VideoCardComponent } from '../components/video-card/video-card';
import { VideoResolver } from '../components/video-card/resolvers/video-embed-resolver';
import { HttpClientModule } from '@angular/common/http';
import { MultiSelectCardComponent } from '../components/multi-select-card/multi-select-card';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { UniqueDeviceIDMock } from '../data/udid-mock';
import { CarouselComponent } from '../components/carousel/carousel';
import { AskMeFragment } from '../pages/fragments/askme.fragment/askme-fragment';
import { AskmePage } from '../pages/askme/askme';
import { AskmePageModule } from '../pages/askme/askme.module';
import { PasswordInputComponent } from '../components/password-input/password-input';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { SelectionChipsComponent } from '../components/selection-chips/selection-chips';
import { ChatViewModel } from '../pages/chat/viewmodel/chat.viewmodel';
import { MessageCommandHandler } from '../data/message.command.handler';
import { DatePickerComponent } from '../components/date-picker/date-picker';
import { ProfilePage } from '../pages/profile/profile';
import { UserProfileProvider } from '../providers/user-profile/user-profile';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { LoginViewModel } from '../pages/login/viewmodel/login.viewmodel';
// import { RouteReuseStrategy } from '@angular/router';
// import { IonicRouteStrategy } from '@ionic/angular';
//import { AppRoutingModule } from './app-routing.module';
import { CountrySelectionComponent } from '../components/country-selection/country-selection';
import { ProfileViewModel } from '../pages/profile/viewmodel/profile.viewmodel';
import { ProfileRepository } from '../data/profile.repository';




// export const deepLinkConfig: DeepLinkConfig = {
//     links: [
//       { component: MainPage, name: "main", segment: ""},
//       //{ component: ProfilePage, name: "profile", segment: "event/:id", defaultHistory: [Home] }
//       { component: ProfilePage, name: "profile", segment: "event/:id"},
//       { component: ChatPage, name: "chat", segment: "event/:id"}
//     ]
//   };


@NgModule({
  declarations: [
    SmartBot,
    ChatPage,
    MainPage,
    AskmePage,
    AskMeFragment,
    DashboardPage,
    ProfilePage
  ],

  imports: [
    HttpClientModule,
    BrowserModule,
    ComponentsModule,
    LoginPageModule,
    //AskmePageModule,

    IonicModule.forRoot(SmartBot, {}),//, deepLinkConfig),
   // AppRoutingModule
  ],

  bootstrap: [IonicApp],
  
  entryComponents: [
    SmartBot,
    MainPage,
    LoginPage,
    ChatPage,
    AskmePage,
    AskMeFragment,
    DashboardPage,
    ProfilePage,


    SimpleMessageComponent,
    QuickActionComponent,
    ImageCardComponent,
    LoginBannerComponent,
    BlockButtonComponent,
    SelectionCardComponent,
    MultiSelectCardComponent,
    VideoCardComponent,
    CarouselComponent,
    PasswordInputComponent,
    AskMeFragment,
    SelectionChipsComponent,
    DatePickerComponent,
    CountrySelectionComponent
  ],

  providers: [
    StatusBar,
    SplashScreen,
    MessageRepository,
    ProfileRepository,
    
    // Singleton VM's
    ChatViewModel,
    LoginViewModel,
    ProfileViewModel,

    Log,
    MessageCommandHandler,
    MessageComponentItemFactory,
    {provide: UniqueDeviceID, useClass: UniqueDeviceIDMock}, 
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //{provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    ChatBotProvider,
    WebSocketServiceProvider,
    MockChatBotProvider,
    MessageComponentProvider,
    VideoResolver,
    UserProfileProvider,
    AuthenticationProvider
  ],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
