import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ChatWindowComponent } from './chat-window/chat-window';
import { SimpleMessageComponent } from './simple-message/simple-message';
import { QuickActionComponent } from './quick-action/quick-action';
import { ImageCardComponent } from './image-card/image-card';
import { LoginBannerComponent } from './login-banner/login-banner';
import { ChatWindowDirective } from '../directives/chat-window/chat-window';
import { BlockButtonComponent } from './block-button/block-button';
import { SelectionCardComponent } from './selection-card/selection-card';
import { VideoCardComponent } from './video-card/video-card';
import { VideoResolver } from './video-card/resolvers/video-embed-resolver';
import { MultiSelectCardComponent } from './multi-select-card/multi-select-card';
import { CarouselComponent } from './carousel/carousel';

import { ModalContainerModule } from './chat-window/modal-container-page/modal-container.module';
import { PasswordInputComponent } from './password-input/password-input';
import { SelectionChipsComponent } from './selection-chips/selection-chips';
import { DatePickerComponent } from './date-picker/date-picker';
import { CountrySelectionComponent } from './country-selection/country-selection';




@NgModule({
	declarations: [
        //ModalContainerPage,
		ChatWindowComponent, 
		SimpleMessageComponent,
		QuickActionComponent,
    	ImageCardComponent,
    LoginBannerComponent,
    ChatWindowDirective,
    BlockButtonComponent,
    SelectionCardComponent,
    VideoCardComponent,
    MultiSelectCardComponent,
    CarouselComponent,
    PasswordInputComponent,
    SelectionChipsComponent,
    DatePickerComponent,
    CountrySelectionComponent

	],
	imports: [
        IonicModule,
        ModalContainerModule
    ],
	exports: [
        //ModalContainerPage,
		ChatWindowComponent,
		SimpleMessageComponent,
		QuickActionComponent,
    	ImageCardComponent,
        LoginBannerComponent,
    BlockButtonComponent,
    SelectionCardComponent,
    VideoCardComponent,
    MultiSelectCardComponent,
    CarouselComponent,
    PasswordInputComponent,
    SelectionChipsComponent,
    DatePickerComponent,
    CountrySelectionComponent

	],
	providers: [VideoResolver],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
