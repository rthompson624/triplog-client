import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootStoreState, AuthenticationStoreSelectors, TripLogStoreActions } from '../../../root-store';
import { TripLog } from '../../../core/models/trip-log.model';
import { TripLogEditorDialogComponent } from '../trip-log-editor-dialog/trip-log-editor-dialog.component';
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
    private dialog: MatDialog,
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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '350px';
    dialogConfig.data = this.log;
    const dialogRef = this.dialog.open(TripLogEditorDialogComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      if (data) {
        const updatedLog = <TripLog>data;
        this.store$.dispatch(new TripLogStoreActions.UpdateAction(updatedLog));
      }
    });    
  }

  onDelete(): void {
  }

}
