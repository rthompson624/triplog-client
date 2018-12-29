import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, AuthenticationStoreActions } from './root-store';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private store$: Store<RootStoreState.State>
  ) { }

  ngOnInit() {
    this.store$.dispatch(new AuthenticationStoreActions.RestoreAuthenticationStateRequestAction());
  }

}
