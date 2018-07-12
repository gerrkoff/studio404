import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../common/components/table.component';
import { BookingUser } from '../../models/booking-user';
import { BookingsService } from '../../services/bookings.service';
import { BookingStatusEnum } from '../../models/booking-status-enum';

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
  BookingStatusEnum = BookingStatusEnum;

  constructor(
    private bookingsService: BookingsService
  ) {
    super();
  }

  async loadItemsCore(): Promise<BookingUser[]> {
    const data = await this.bookingsService.getUserBookings();
    return this.sort(data, 'from', false);
  }

  onCancelBooking(id: number): void {
    this.rowProcessingWrapper(id, async () => {
      await this.bookingsService.cancelBooking(id);
      this.loadedItems.find(x => x.id === id).status = BookingStatusEnum.Canceled;
    });
  }
}
