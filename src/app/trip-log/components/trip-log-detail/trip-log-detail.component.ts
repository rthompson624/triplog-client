import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootStoreState, AuthenticationStoreSelectors } from '../../../root-store';
import { TripLog } from '../../../core/models/trip-log.model';
import { User } from '../../../core/models/user.model';
import { DateService } from '../../../core/services/date.service';
import { MediaService } from '../../../core/services/media.service';

@Component({
  selector: 'app-trip-log-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trip-log-detail.component.html',
  styleUrls: ['./trip-log-detail.component.css']
})
export class TripLogDetailComponent implements OnInit, OnDestroy {
  @Input() log: TripLog;
  @Output() editItem = new EventEmitter<TripLog>();
  @Output() deleteItem = new EventEmitter<TripLog>();
  user$: Observable<User>;
  private ngUnsubscribe = new Subject<boolean>();

  constructor(
    public dateService: DateService,
    public mediaService: MediaService,
    private store$: Store<RootStoreState.State>
  ) {
  }

  ngOnInit() {
    this.user$ = this.store$.select(AuthenticationStoreSelectors.selectUser);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  onEdit(): void {
  }

  onDelete(): void {
  }

}
