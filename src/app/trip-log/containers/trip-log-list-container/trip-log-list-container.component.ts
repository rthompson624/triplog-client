import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Trip } from '../../../core/models/trip.model';
import { TripLog } from '../../../core/models/trip-log.model';
import { RootStoreState, TripLogStoreActions, TripLogStoreSelectors } from '../../../root-store';

@Component({
  selector: 'app-trip-log-list-container',
  templateUrl: './trip-log-list-container.component.html',
  styleUrls: ['./trip-log-list-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripLogListContainerComponent implements OnInit {
  @Input() trip: Trip;
  logs$: Observable<TripLog[]>;

  constructor(
    private store$: Store<RootStoreState.State>
  ) {
  }

  ngOnInit() {
    this.store$.dispatch(new TripLogStoreActions.LoadManyAction({ pageIndex: null, tripId: this.trip.id }));
    this.logs$ = this.store$.select(TripLogStoreSelectors.selectAllTripLogItems);
  }

  onCreate() {
  }

}
