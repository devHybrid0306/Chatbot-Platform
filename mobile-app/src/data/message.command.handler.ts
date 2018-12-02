import { Injectable } from '@angular/core'
import { Log } from '../util/logger';
import { Events } from 'ionic-angular';
import { IMessage, ISystemCommand } from './model/IMessage';

@Injectable()
export class MessageCommandHandler extends Log {
    commands: string[] = [];
    
    constructor(private events: Events) {
        super();
        this.tag = "MessageCommandHandler";
    }

    handleCommand(json: string) {
        this.debug("Handling command " + json);
        try {
            let message: IMessage = JSON.parse(json)['message'];

            this.print(message);

            if (undefined != message.system) {
                let commands: ISystemCommand[] = message.system.command;
                
                this.debug("System payload found " + message.system.command);
                
                if (undefined != commands) {
                    this.debug("Commands payload found");
                    for (let command of commands) {
                        this.debug("Sending command " + command);
                        this.events.publish("COMMAND_EVENT", command);
                    }
                }
            }
        }
        catch(e) {
            this.error("JSON Parse failed");
        }

    }


    private print(obj) {
        for (var prop in obj) {
            this.debug("prop: " + prop + " = " + obj[prop]);
        }
    }
}