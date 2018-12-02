import { ISelectionCardData, ISelectionItem } from '../../../components/selection-card/selection-card';
import { Log } from '../../../util/logger';
import { IAttachmentBody } from '../IMessage';

export class SelectionCardData implements ISelectionCardData {
    text: string;
    selectionItems: ISelectionItem[] = [];
    selectedItems: string[] = [];
    tag: number;
    log: Log = new Log();
    title: string = "";
    constructor(public content: IAttachmentBody) {
        this.parse();
    }

    private isSelected(value: any): boolean {
        return this.selectedItems.filter((element, index, array) => {
            if (element == undefined) {
                return false;
            }

            return element.toLowerCase().indexOf(value.toLowerCase()) > -1;
        }).length > 0;
    }

    parse() {
        this.log.d("SelectionCardData", this.content.title);
        this.selectionItems = [];

        if (undefined != this.content) {
            this.text = this.content.title;
            this.title = this.content.title;
            
            for (let action of this.content.actions) {
                this.log.d("SelectionCardData", action.title);

                let item = <ISelectionItem> action;
                item.isSelected = this.isSelected(item.title);
                this.selectionItems.push(item);
            }
            this.log.d("SelectionCardData Result", this.selectionItems.length);
        }
    }
}
