import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../common/components/table.component';
import { BookingUser } from '../../models/booking-user';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: [
    './user-bookings.component.css',
    '../../../common/styles/table.css'
  ]
})
export class UserBookingsComponent extends TableComponent<BookingUser> {
  
  itemSearchFieldName = 'userDisplayName';

  constructor(
    private bookingsService: BookingsService
  ) {
    super();
  }

  loadItemsCore(): Promise<BookingUser[]> {
    return this.bookingsService.getUserBookings();
  }
}
