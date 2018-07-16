import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import { BookingSimple } from '../../models/booking-simple';
import { TableComponent } from '../../../common/components/table/table.component';
import { TableEditableComponent } from '../../../common/components/table-editable/table-editable.component';

@Component({
  selector: 'app-special-codes',
  templateUrl: './special-codes.component.html',
  styleUrls: [
    './special-codes.component.css',
    '../../../common/styles/table.css'
  ]
})
export class SpecialCodesComponent extends TableEditableComponent<BookingSimple> {

  protected itemSearchFieldName = '';

  constructor(
    private bookingsService: BookingsService
  ) {
    super();
  }

  protected async loadItemsCore(): Promise<BookingSimple[]> {
    const data = await this.bookingsService.getSpecialBookings();
    return this.sort(data, 'from', false);
  }

  protected createNewItem(): BookingSimple {
    return {
      code: '0000',
      from: new Date(),
      to: new Date(),
      id: 0
    };
  }

  protected saveItem(id: number): Promise<BookingSimple> {
    return this.bookingsService.saveSpecialBooking(this.table.rows[id].data);
  }
  protected deleteItem(id: number): Promise<void> {
    return this.bookingsService.deleteBooking(id);
  }

  protected validate(id: number): boolean {
    const row = this.table.rows[id];
    row.fieldInvalid['code'] = row.data.code.length === 0;
    return !row.fieldInvalid['code'];
  }
}
