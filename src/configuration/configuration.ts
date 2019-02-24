import { environment } from '../environments/environment';

export const AppConfiguration = {
  apiPageSize: 10,
  imageDomain: 'trip-log.s3.us-east-2.amazonaws.com',
  imageUploadEndpoint: 'image-upload' + '/' + environment.envAbbreviation,
  imageUrlPrefix: environment.envAbbreviation + '/' + 'users',
  imageProfileBlank: 'profile-blank.png',
  imageBlank: 'image-blank.png'
};
