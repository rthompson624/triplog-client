import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripLog } from '../../../core/models/trip-log.model';

@Component({
  selector: 'app-trip-log-editor-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trip-log-editor-dialog.component.html',
  styleUrls: ['./trip-log-editor-dialog.component.css']
})
export class TripLogEditorDialogComponent implements OnInit {
  log: TripLog;
  editMode: string;
  logForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<TripLogEditorDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.log = data;
    this.editMode = this.log.id ? 'Edit' : 'New';
  }

  ngOnInit() {
    this.buildForm();
  }

  save() {
    this.log.description = this.logForm.controls['description'].value;
    this.log.logDate = this.logForm.controls['logDate'].value;
    this.log.imageUrl = this.logForm.controls['imageUrl'].value;
    this.dialogRef.close(this.log);
  }

  cancel() {
    this.dialogRef.close();
  }

  private buildForm(): void {
    this.logForm = this.fb.group(
      {
        description: [this.log.description, []],
        logDate: [this.log.logDate, [Validators.required]],
        imageUrl: [this.log.imageUrl, []]
      }
    );
  }

}
