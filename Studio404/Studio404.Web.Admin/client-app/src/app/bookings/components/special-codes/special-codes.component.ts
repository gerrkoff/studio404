import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import { BookingSimple } from '../../models/booking-simple';
import { Table } from '../../../common/models/table';
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

  onSaveEdit(id: number): void {
    this.rowEdittingWrapper(id, () =>
      this.bookingsService.saveSpecialBooking(this.table.rows[id].data)
    );
  }
}
