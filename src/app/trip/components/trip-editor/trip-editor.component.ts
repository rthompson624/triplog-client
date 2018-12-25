import { Component, OnInit, Output, EventEmitter, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Trip } from '../../../core/models/trip.model';
import { LocationService } from '../../../core/services/location.service';

@Component({
  selector: 'app-trip-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trip-editor.component.html',
  styleUrls: ['./trip-editor.component.css']
})
export class TripEditorComponent implements OnInit, OnChanges {
  @Input() trip: Trip;
  @Output() tripSave = new EventEmitter<Trip>();
  
  tripForm: FormGroup;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    public locationService: LocationService
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.trip) this.buildForm();
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.trip.name = this.tripForm.controls['name'].value;
    this.trip.startDate = this.tripForm.controls['startDate'].value;
    this.trip.endDate = this.tripForm.controls['endDate'].value;
    this.tripSave.emit(this.trip);
  }

  private buildForm(): void {
    this.tripForm = this.fb.group(
      {
        name: [this.trip.name, [Validators.required]],
        startDate: [this.trip.startDate, [Validators.required]],
        endDate: [this.trip.endDate, [Validators.required]]
      }
    );
  }

}
