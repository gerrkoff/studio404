import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import { BookingSimple } from '../../models/booking-simple';
import { Table } from '../../../common/models/table';

@Component({
  selector: 'app-special-codes',
  templateUrl: './special-codes.component.html',
  styleUrls: ['./special-codes.component.css']
})
export class SpecialCodesComponent implements OnInit {

  data: BookingSimple[];
  table: Table<BookingSimple>;

  constructor(
    private bookingsService: BookingsService
  ) { }

  ngOnInit() {
    this.table = {
      rows: {},
      isLoading: false
    };
    this.data = [];
    this.loadBookings();
  }

  private async loadBookings(): Promise<void> {
    if (!this.table.isLoading) {
      this.table.isLoading = true;
      try {
        this.data = await this.bookingsService.getSpecialBookings();
        this.updateRows();
      }
      finally {
        this.table.isLoading = false;
      }
    }
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
        Object.assign(this.data.find(x => x.id === id), this.table.rows[id].data);
        this.table.rows[id].isEditting = false;
      }
      finally {
        this.table.rows[id].isProcessing = false;
      }
    }
  }

  private updateRows(): void {
    this.data.forEach(x => 
        this.table.rows[x.id] = {
          isEditting: false,
          isProcessing: false,
          data: {...x}
        }
    );
  }
}
