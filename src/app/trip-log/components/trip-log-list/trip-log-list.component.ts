import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { TripLog } from '../../../core/models/trip-log.model';
import { DateService } from '../../../core/services/date.service';

@Component({
  selector: 'app-trip-log-list',
  templateUrl: './trip-log-list.component.html',
  styleUrls: ['./trip-log-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripLogListComponent implements OnInit {
  @Input() logs: TripLog[];

  constructor(
    private dateService: DateService
  ) {
  }

  ngOnInit() {
  }

  onCreate() {
  }

}
