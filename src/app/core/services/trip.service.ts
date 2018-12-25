import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CoreModule } from '../core.module';
import { Multiple } from '../models/multiple.model';
import { Trip } from '../models/trip.model';
import { environment } from '../../../environments/environment';
import { AppConfiguration } from '../../../configuration/configuration';

@Injectable({
  providedIn: CoreModule
})
export class TripService {
  private confUrl: string = 'http://' + environment.restApiDomain + '/trips';
  private pageSize: number = AppConfiguration.apiPageSize;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  create(trip: Trip): Observable<Trip> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.httpClient.post<Trip>(this.confUrl, trip, options);
  }

  update(trip: Trip): Observable<Trip> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.httpClient.put<Trip>(this.confUrl + '/' + trip.id, trip, options);
  }

  getOne(id: number): Observable<Trip> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.httpClient.get<Trip>(this.confUrl + '/' + id, options);
  }

  getMany(pageIndex: number, creatorId?: number): Observable<Multiple<Trip>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const skip = (pageIndex * this.pageSize);
    let params: HttpParams;
    if (creatorId) {
      params = new HttpParams()
        .set('$skip', skip.toString(10))
        .set('$limit', this.pageSize.toString(10))
        .set('creatorId', String(creatorId));
    } else {
      params = new HttpParams()
        .set('$skip', skip.toString(10))
        .set('$limit', this.pageSize.toString(10));
    }
    const options = {headers: headers, params: params};
    return this.httpClient.get<Multiple<Trip>>(this.confUrl, options);
  }

  delete(trip: Trip): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.httpClient.delete<void>(this.confUrl + '/' + trip.id, options);
  }

}
