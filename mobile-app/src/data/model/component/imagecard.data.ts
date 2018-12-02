import { IImageCardData } from '../../../components/image-card/image-card';
import { ISelectionItem } from '../../../components/selection-card/selection-card';
import { IAttachmentBody } from '../IMessage';
import { Log } from '../../../util/logger';


export class ImageCardData implements IImageCardData {
    tag: number = 0;
    title: string = null;
    subtitle: string = null;
    imageSource: string = null;
    text: string = null;
    selectionItems: ISelectionItem[] = [];
    private log: Log = new Log();
    constructor(public content: IAttachmentBody) {
        this.parse();
        
    }

    parse() {
        this.log.d("AttachmentData", this.content.title);
      
        this.title = this.content.title;
        this.subtitle = this.content.subtitle;
        this.imageSource = this.content.content;
        this.text = this.content.text;
       
        for (let action of this.content.actions) {
            
            this.selectionItems.push(<ISelectionItem> action);
        }

        this.log.d("AttachmentData", this.title + " : " + this.subtitle + " : " + this.imageSource);
    }
}