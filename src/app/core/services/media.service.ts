import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { CoreModule } from '../core.module';
import { AppConfiguration } from '../../../configuration/configuration';

@Injectable({
  providedIn: CoreModule
})
export class MediaService {

  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  getImageUrl(userId: number, imageFileName: string, type?: string): SafeUrl {
    if (!imageFileName) {
      let file: string;
      switch(type) {
        case 'profile':
          file = AppConfiguration.imageProfileBlank;
          break;
        default:
          file = AppConfiguration.imageBlank;
      }
      return this.sanitizer.bypassSecurityTrustUrl('/assets/graphics/' + file);
    } else {
      return this.sanitizer.bypassSecurityTrustUrl('https://' + AppConfiguration.imageDomain + '/' + AppConfiguration.imageUrlPrefix + '/' + userId + '/' + imageFileName);
    }
  }

}
