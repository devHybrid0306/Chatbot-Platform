import {Log} from "../util/logger"
import { Events, NavController } from "ionic-angular";

export abstract class Page extends Log {
    

    constructor(protected events: Events,
        protected navController: NavController) {
        super();
    
        
    }

    
}