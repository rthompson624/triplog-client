import { TripStoreState } from './trip-store';
import { AuthenticationStoreState } from './authentication-store';

export interface State {
  trip: TripStoreState.State;
  authentication: AuthenticationStoreState.State;
}
