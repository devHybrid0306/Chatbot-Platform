import { Log } from "../util/logger";
import { Injectable } from '@angular/core';
import { AuthenticationProvider } from '../providers/authentication/authentication';


@Injectable()
export class AuthRepository extends Log {
    accessToken: string;

    constructor(private authProvider: AuthenticationProvider) {
        super();
        this.tag = "AuthRepository";
    }


}