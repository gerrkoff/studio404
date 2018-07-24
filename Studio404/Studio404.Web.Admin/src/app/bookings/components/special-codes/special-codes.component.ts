import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import { BookingSimple } from '../../models/booking-simple';
import { TableEditableComponent } from '../../../common/components/table-editable/table-editable.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  protected loadItemsCore(): Observable<BookingSimple[]> {
    return this.bookingsService.getSpecialBookings().pipe(
      map(x => this.sort(x, 'from', false))
    );
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

  protected saveItem(id: number): Observable<BookingSimple> {
    return this.bookingsService.saveSpecialBooking(this.table.rows[id].data);
  }
  protected deleteItem(id: number): Observable<void> {
    return this.bookingsService.deleteBooking(id);
  }

  protected validate(id: number): boolean {
    const row = this.table.rows[id];

    row.fieldInvalid['from'] = false;
    row.fieldInvalid['to'] = false;
    row.fieldInvalid['code'] = !(/^\d+$/.test(row.data.code));

    if (!row.data.from) {
      row.fieldInvalid['from'] = true;
    }

    if (!row.data.to) {
      row.fieldInvalid['to'] = true;
    }

    if (row.data.to && row.data.from && row.data.from > row.data.to) {
      row.fieldInvalid['from'] = true;
      row.fieldInvalid['to'] = true;
    }

    return !row.fieldInvalid['code'] && !row.fieldInvalid['from'] && !row.fieldInvalid['to'];
  }
}
