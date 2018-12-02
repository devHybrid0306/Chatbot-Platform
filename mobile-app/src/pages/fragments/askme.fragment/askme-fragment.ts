import { Component, Input } from '@angular/core';
import { Log } from '../../../util/logger';
import { IonicPage } from 'ionic-angular';
import { AskMeViewModel } from './viewmodel/askme-fragment-viewmodel';


@Component({
    selector: 'askme-fragment',
    templateUrl: 'askme-fragment.html'
  })
  export class AskMeFragment extends Log {
        @Input() viewModel: IAskMeFragmentViewModel = new AskMeViewModel();
        @Input() delegate: IAskMeFragmentListener;

        constructor() {
            super();
            this.tag = "AskMeFragment";
        }
    
        onItemSelect(event: MouseEvent) {
            let id: string = (<HTMLElement>event.srcElement).getAttribute("ng-reflect-id");
            this.debug(id);
            if (undefined != this.delegate)
                this.delegate.onAskMeItemSelect(id, this.viewModel.messagesForID(id));
        }

  }

  export interface IAskMeFragmentViewModel {
        taskSelectionList: string[]
        messagesForID(id: any);
  }

  export interface IAskMeFragmentListener {
      onAskMeItemSelect(itemIndex, payload);
  }