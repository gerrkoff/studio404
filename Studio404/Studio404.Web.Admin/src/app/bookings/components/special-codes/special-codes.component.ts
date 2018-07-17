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
    data.forEach(x => {
      x.from = new Date(x.from);
      x.to = new Date(x.to);
    });
    return this.sort(data, 'from', false);
  }

  protected createNewItem(): BookingSimple {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return {
      code: '0000',
      from: today,
      to: today,
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

    if(!row.data.from) {
      row.fieldInvalid['from'] = true;
    }

    if(!row.data.to) {
      row.fieldInvalid['to'] = true;
    }

    if(row.data.to && row.data.from && row.data.from > row.data.to) {
      row.fieldInvalid['from'] = true;
      row.fieldInvalid['to'] = true;
    }
    
    return !row.fieldInvalid['code'] && !row.fieldInvalid['from'] && !row.fieldInvalid['to'];
  }
}
