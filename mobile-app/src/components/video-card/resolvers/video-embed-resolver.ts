import { Injectable } from  "@angular/core";
import { HttpClient, HttpParameterCodec } from '@angular/common/http';
import { Log } from '../../../util/logger';
import { DomSanitizer } from '@angular/platform-browser';

import { Observer, Subscription } from "rxjs";

@Injectable()
export class VideoResolver extends Log {

    subscriptionRef: Subscription;

    constructor(private httpClient: HttpClient, 
        protected sanitizer: DomSanitizer) {
        super();
        this.tag = "VideoResolver";
    }

    resolve(url: string, onResult: (value: any) => void): void {
        if (url.indexOf("vimeo.com") > 0)
        {
            this.resolveVimeo(url, onResult);
        }
        else if (url.indexOf("youtube.com") > 0) {
            this.resolveYouTube(url, onResult);
        }
    }


    private resolveYouTube(url: string, onResult: (value: any)=> void): void {
        onResult(url);
    }




    private resolveVimeo(url: string, onResult: (value: any) => void): void {
        
        if (url.indexOf("vimeo.com") > 0) {

            this.debug("Resolving for vimeo");

            this.httpClient.get("https://vimeo.com/api/oembed.json?url=" + (url)).subscribe((result)=>{
                
                    for (let key in result) {
                        this.debug(key + " : " + result[key]);
                    }
                    
                    // Extract the final url from the iframe response.
                    let iframe: string = result['html'];
                    let startIndex: number = iframe.indexOf("src");
                    let endIndex: number = iframe.indexOf("width");
                    
                    // remove the unwanted characters from the url.
                    var finalUrl: string = iframe.substr(startIndex, endIndex-startIndex);
                    finalUrl = finalUrl.split("\"")[1];
                  
                    onResult(finalUrl);
                  
            })
            
        }
        
    }

}