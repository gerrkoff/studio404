import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import { BookingSimple } from '../../models/booking-simple';
import { TableComponent } from '../../../common/components/table.component';

@Component({
  selector: 'app-special-codes',
  templateUrl: './special-codes.component.html',
  styleUrls: [
    './special-codes.component.css',
    '../../../common/styles/table.css'
  ]
})
export class SpecialCodesComponent extends TableComponent<BookingSimple> {

  itemSearchFieldName = '';

  constructor(
    private bookingsService: BookingsService
  ) {
    super();
  }

  loadItemsCore(): Promise<BookingSimple[]> {
    return this.bookingsService.getSpecialBookings();
  }

  createNewItem(): BookingSimple {
    return {
      code: '0000',
      from: new Date(),
      to: new Date(),
      id: 0
    };
  }

  onSaveEdit(id: number): void {
    this.rowEdittingWrapper(id, () =>
      this.bookingsService.saveSpecialBooking(this.table.rows[id].data)
    );
  }
}
