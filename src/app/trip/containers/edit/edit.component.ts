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
  selector: 'app-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
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

  onSave(trip: Trip): void {
    this.store$.dispatch(new TripStoreActions.UpdateAction(trip));
  }

  registerListeners(): void {
    // Subscribe to UPDATE_SUCCESS action
    this.actions$.pipe(
      ofType<TripStoreActions.UpdateSuccessAction>(TripStoreActions.ActionTypes.UPDATE_SUCCESS),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(action => {
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }

}
