import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CoreModule } from '../core.module';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: CoreModule
})
export class UserService {
  private userUrl: string = 'http://' + environment.restApiDomain + '/users';

  constructor(private httpClient: HttpClient) {
  }

  create(user: User): Observable<User> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.httpClient.post<User>(this.userUrl, user, options);
  }

  getOne(id: number): Observable<User> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.httpClient.get<User>(this.userUrl + '/' + id, options);
  }

}
