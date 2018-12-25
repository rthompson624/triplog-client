import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Trip } from '../../../core/models/trip.model';
import { RootStoreState, TripStoreActions } from '../../../root-store';

@Component({
  selector: 'app-create',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  trip: Trip = {
    name: null,
    creatorId: null
  };

  constructor(
    private store$: Store<RootStoreState.State>
  ) {
  }

  ngOnInit() {
  }

  onSave(trip: Trip): void {
    this.store$.dispatch(new TripStoreActions.CreateAction(trip));
  }

}
