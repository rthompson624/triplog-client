import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Subject } from 'rxjs';

import { Trip } from '../../../core/models/trip.model';
import { RootStoreState, TripStoreActions, TripStoreSelectors } from '../../../root-store';

@Component({
  selector: 'app-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<boolean>();
  trip$: Observable<Trip>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<RootStoreState.State>,
    private actions$: Actions
  ) {
  }

  ngOnInit() {
    this.trip$ = this.route.paramMap.pipe(
      switchMap(paramMap => {
        this.store$.dispatch(new TripStoreActions.LoadOneAction({ id: parseInt(paramMap.get('id'))}));
        return this.store$.select(TripStoreSelectors.selectTripById(parseInt(paramMap.get('id'))));
      })
    );
    this.registerListeners();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  editTrip(): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  deleteTrip(trip: Trip): void {
    this.store$.dispatch(new TripStoreActions.DeleteAction(trip));
  }

  registerListeners(): void {
    // Subscribe to DELETE_SUCCESS action
    this.actions$.pipe(
      ofType<TripStoreActions.DeleteSuccessAction>(TripStoreActions.ActionTypes.DELETE_SUCCESS),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(action => {
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }

}
