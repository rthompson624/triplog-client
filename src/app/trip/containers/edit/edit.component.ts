import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Trip } from '../../../core/models/trip.model';
import { RootStoreState, TripStoreActions, TripStoreSelectors } from '../../../root-store';

@Component({
  selector: 'app-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  trip$: Observable<Trip>;

  constructor(
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.State>
  ) {
  }

  ngOnInit() {
    this.trip$ = this.route.paramMap.pipe(
      switchMap(paramMap => {
        this.store$.dispatch(new TripStoreActions.LoadOneAction({ id: parseInt(paramMap.get('id'))}));
        return this.store$.select(TripStoreSelectors.selectTripById(parseInt(paramMap.get('id'))));
      })
    );
  }

  onSave(trip: Trip): void {
    this.store$.dispatch(new TripStoreActions.UpdateAction(trip));
  }

}
