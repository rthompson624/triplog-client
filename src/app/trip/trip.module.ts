import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, 
  MatProgressSpinnerModule, MatTableModule, MatDialogModule,
  MatPaginatorModule, MatDatepickerModule, MatSelectModule
} from '@angular/material';

import { TripRoutingModule } from './trip-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TripLogModule } from '../trip-log/trip-log.module';

import { ListComponent } from './containers/list/list.component';
import { DetailComponent } from './containers/detail/detail.component';
import { CreateComponent } from './containers/create/create.component';
import { EditComponent } from './containers/edit/edit.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';
import { TripEditorComponent } from './components/trip-editor/trip-editor.component';
import { TripDeleteDialogComponent } from './components/trip-delete-dialog/trip-delete-dialog.component';

@NgModule({
  entryComponents: [
    TripDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    TripRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    ReactiveFormsModule,
    SharedModule,
    TripLogModule,
    MatDialogModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  declarations: [
    ListComponent,
    TripListComponent,
    TripDetailComponent,
    DetailComponent,
    TripEditorComponent,
    CreateComponent,
    EditComponent,
    TripDeleteDialogComponent
  ]
})
export class TripModule {
}