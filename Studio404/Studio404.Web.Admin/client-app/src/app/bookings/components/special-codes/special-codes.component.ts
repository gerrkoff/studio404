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

  constructor(
    private bookingsService: BookingsService
  ) {
    super();
  }

  loadItemsCore(): Promise<BookingSimple[]> {
    return this.bookingsService.getSpecialBookings();
  }

  onStartEdit(id: number): void {
    this.table.rows[id].isEditting = true;
  }

  onCancelEdit(id: number): void {
    this.table.rows[id].isEditting = false;
  }

  async onSaveEdit(id: number): Promise<void> {
    if (!this.table.rows[id].isProcessing) {
      this.table.rows[id].isProcessing = true;
      try {
        await this.bookingsService.saveSpecialBooking(this.table.rows[id].data);
        Object.assign(this.loadedItems.find(x => x.id === id), this.table.rows[id].data);
        this.table.rows[id].isEditting = false;
      }
      finally {
        this.table.rows[id].isProcessing = false;
      }
    }
  }
}
