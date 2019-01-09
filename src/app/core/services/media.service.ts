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

  getAvatarUrl(imageFileName: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(AppConfiguration.avatarPath + imageFileName);
  }

  getTripLogImageUrl(imageFileName: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(AppConfiguration.tripLogImagePath + imageFileName);
  }

}
