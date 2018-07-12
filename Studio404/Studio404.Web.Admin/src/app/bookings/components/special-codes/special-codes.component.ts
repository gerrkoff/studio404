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

  async loadItemsCore(): Promise<BookingSimple[]> {
    const data = await this.bookingsService.getSpecialBookings();
    return this.sort(data, 'from', false);
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
    this.rowUpdatingWrapper(id, () =>
      this.bookingsService.saveSpecialBooking(this.table.rows[id].data)
    );
  }

  onDeleteRow(id: number): void {
    if (id < 0) {
      this.deleteRow(id);
      return;
    }

    this.rowProcessingWrapper(id, async () => {
      await this.bookingsService.deleteBooking(id);
      this.deleteRow(id);
    });
  }
}
