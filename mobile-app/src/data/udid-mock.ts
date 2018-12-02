import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { UUID } from 'angular2-uuid';


export class UniqueDeviceIDMock extends UniqueDeviceID {
    get(): Promise<any> {
        console.log("\n\n\n\nUnique ID Mock " + UUID.UUID() + "\n\n\n");
        return new Promise((resolve, reject)=>{
            let id =  UUID.UUID();//"TestUUID." + Math.random();
            resolve(id);
        });
    }    
}