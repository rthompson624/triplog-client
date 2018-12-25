import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material';
import { Store } from '@ngrx/store';

import { Trip } from '../../../core/models/trip.model';
import { RootStoreState, TripStoreActions, TripStoreSelectors } from '../../../root-store';
import { Page } from '../../../core/models/page.model';

@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  columns: string[] = ['name', 'startDate'];
  trips$: Observable<Trip[]>;
  page$: Observable<Page>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.State>
  ) {
  }

  ngOnInit() {
    this.trips$ = this.store$.select(TripStoreSelectors.selectAllTripItems);
    this.page$ = this.store$.select(TripStoreSelectors.selectTripPage);
    this.loadTrips(null); // Null signifies use page in store
  }

  selectTrip(trip: Trip): void {
    this.router.navigate([trip.id.toString(10)], {relativeTo: this.route});
  }

  onLoad(event: PageEvent) {
    this.loadTrips(event.pageIndex);
  }

  private loadTrips(pageIndex: number): void {
    this.store$.dispatch(
      new TripStoreActions.LoadManyAction({pageIndex: pageIndex})
    );
  }

}
