import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CoreModule } from '../core.module';
import { Multiple } from '../models/multiple.model';
import { TripLog } from '../models/trip-log.model';
import { environment } from '../../../environments/environment';
import { AppConfiguration } from '../../../configuration/configuration';

@Injectable({
  providedIn: CoreModule
})
export class TripLogService {
  private confUrl: string = 'http://' + environment.restApiDomain + '/triplogs';
  private pageSize: number = AppConfiguration.apiPageSize;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  create(triplog: TripLog): Observable<TripLog> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.httpClient.post<TripLog>(this.confUrl, triplog, options);
  }

  update(triplog: TripLog): Observable<TripLog> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.httpClient.put<TripLog>(this.confUrl + '/' + triplog.id, triplog, options);
  }

  getOne(id: number): Observable<TripLog> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.httpClient.get<TripLog>(this.confUrl + '/' + id, options);
  }

  getMany(pageIndex: number, tripId: number): Observable<Multiple<TripLog>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const skip = (pageIndex * this.pageSize);
    let params: HttpParams;
    params = new HttpParams()
      .set('$skip', skip.toString(10))
      .set('$limit', this.pageSize.toString(10))
      .set('$sort[logDate]', '1')
      .set('tripId', String(tripId));
    const options = {headers: headers, params: params};
    return this.httpClient.get<Multiple<TripLog>>(this.confUrl, options);
  }

  delete(triplog: TripLog): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.httpClient.delete<void>(this.confUrl + '/' + triplog.id, options);
  }

}
