import { Component, ViewChild, ElementRef, Renderer, ChangeDetectorRef, ChangeDetectionStrategy, SecurityContext } from '@angular/core';
import { ImageCardComponent, IImageCardData } from '../image-card/image-card';
import { Events } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoResolver } from './resolvers/video-embed-resolver';

/**
 * Generated class for the VideoCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'video-card',
  templateUrl: 'video-card.html'
})
export class VideoCardComponent extends ImageCardComponent {
    @ViewChild('videoScreen') video: ElementRef;
    @ViewChild('videoEmbedContainer') videoContainer: ElementRef;
    @ViewChild('videoIFrame') videoIFrame: ElementRef;
    text: string;
    embed = null;
  constructor(
      protected events: Events, 
      private videoResolver: VideoResolver,
      private renderer: Renderer,
      private sanitizer: DomSanitizer,
      public elementRef: ElementRef) {
      
        super(events, elementRef);
        this.tag = "VideoCardComponent";
        this.componentId = this.tag;
       
  }

  ngAfterContentInit() {
     
        this.debug("\n\n\n after view init " + this.componentData['imageSource']);
        
        let imageData = <IImageCardData> this.componentData;
        this.debug("image data: " + imageData.imageSource);

        if (imageData.imageSource != null && imageData.imageSource != undefined) {
            this.videoResolver.resolve(imageData.imageSource, (result) => {
                
                this.debug(result);  

                if (result != null) {
                    this.renderer.setElementStyle(this.videoContainer.nativeElement, "display",  "inline-block");
                    this.embed = this.sanitizer.bypassSecurityTrustResourceUrl(result);
                }
           
           });
           
        }
    
  }

  videoUrl(): string {
      return this.embed;
  }

  
  onPlay(): void {
      this.debug("Video clicked");
      
      if (this.video.nativeElement.paused) {
          this.video.nativeElement.play();
      }
      else {
          this.video.nativeElement.pause();
      }
   }

}
