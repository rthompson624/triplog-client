import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Trip } from '../../core/models/trip.model';
import { Page } from '../../core/models/page.model';

export const featureAdapter: EntityAdapter<Trip> = createEntityAdapter<Trip>({
  selectId: model => model.id,
  sortComparer: (a: Trip, b: Trip): number =>
    a.name.toString().localeCompare(b.name.toString())
});

export interface State extends EntityState<Trip> {
  page?: Page;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = featureAdapter.getInitialState({
  page: {
    total: null,
    limit: null,
    skip: 0
  },
  isLoading: false,
  error: null
});
