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

  getImageUrl(userId: number, imageFileName: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl('https://' + AppConfiguration.imageDomain + '/' + AppConfiguration.imageUrlPrefix + '/' + userId + '/' + imageFileName);
  }

}
