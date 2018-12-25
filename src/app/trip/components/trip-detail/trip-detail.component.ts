import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Trip } from '../../../core/models/trip.model';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { LocationService } from '../../../core/services/location.service';
import { DateService } from '../../../core/services/date.service';

@Component({
  selector: 'app-trip-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css']
})
export class TripDetailComponent implements OnInit, OnDestroy {
  @Input() trip: Trip;
  @Output() clickEdit = new EventEmitter<Trip>();
  @Output() clickDelete = new EventEmitter<Trip>();
  private ngUnsubscribe = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
    public locationService: LocationService,
    public dateService: DateService
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  onClickEdit(): void {
    this.clickEdit.emit(this.trip);
  }

  onClickDelete(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.trip;
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      if (data) {
        this.clickDelete.emit(this.trip);
      }
    });    
  }

}