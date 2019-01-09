import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, 
  MatCardModule, MatDialogModule, MatDatepickerModule, MatSelectModule
} from '@angular/material';

import { TripLogListComponent } from './components/trip-log-list/trip-log-list.component';
import { TripLogDetailComponent } from './components/trip-log-detail/trip-log-detail.component';

const components = [
  TripLogListComponent,
  TripLogDetailComponent
];

@NgModule({
  entryComponents: [
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  declarations: [...components],
  exports: [...components]
})
export class TripLogModule {
}
