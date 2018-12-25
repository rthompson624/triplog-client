import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Trip } from '../../../core/models/trip.model';

@Component({
  selector: 'app-delete-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  trip: Trip;

  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.trip = data;
  }

  ngOnInit() {
  }

  delete() {
    this.dialogRef.close(this.trip);
  }

  cancel() {
    this.dialogRef.close();
  }

}
