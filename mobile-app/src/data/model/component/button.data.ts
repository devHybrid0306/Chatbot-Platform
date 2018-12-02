import { IBlockButtonData } from '../../../components/block-button/block-button';
import { IAttachmentBody } from '../IMessage';
export class ButtonData implements IBlockButtonData {
    title: string;
    payload: any;
    tag: number;
    constructor(public content: IAttachmentBody) {
        this.parse();
    }
    parse() {
        if (null != this.content) {
            this.title = this.content.title;
            if (this.content.actions != undefined && this.content.actions != null) {
                this.payload = this.content.actions[0].payload;
            }
        }
    }
}