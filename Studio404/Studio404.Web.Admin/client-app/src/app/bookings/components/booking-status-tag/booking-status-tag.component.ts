import { Component, OnInit, Input } from '@angular/core';
import { BookingStatusEnum } from '../../models/booking-status-enum';

@Component({
  selector: 'app-booking-status-tag',
  templateUrl: './booking-status-tag.component.html',
  styleUrls: ['./booking-status-tag.component.css']
})
export class BookingStatusTagComponent implements OnInit {

  @Input() value: number = BookingStatusEnum.None;

  BookingStatusEnum = BookingStatusEnum;
  
  constructor() { }

  ngOnInit() {
  }

}
