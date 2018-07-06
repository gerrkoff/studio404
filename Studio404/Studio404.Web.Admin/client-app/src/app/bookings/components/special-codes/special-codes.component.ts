import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import { BookingSimple } from '../../models/booking-simple';

@Component({
  selector: 'app-special-codes',
  templateUrl: './special-codes.component.html',
  styleUrls: ['./special-codes.component.css']
})
export class SpecialCodesComponent implements OnInit {

  data: BookingSimple[];
  rows: any;

  constructor(
    private bookingsService: BookingsService
  ) { }

  ngOnInit() {
    this.rows = {
      isLoading: false
    };
    this.data = [];
    this.loadBookings();
  }

  private async loadBookings(): Promise<void> {
    if (!this.rows.isLoading) {
      this.rows.isLoading = true;
      try {
        this.data = await this.bookingsService.getSpecialBookings();
        this.updateRows();
      }
      finally {
        this.rows.isLoading = false;
      }
    }
  }

  onStartEdit(id: number): void {
    this.rows[id].isEditting = true;
  }

  onCancelEdit(id: number): void {
    this.rows[id].isEditting = false;
  }

  async onSaveEdit(id: number): Promise<void> {
    if (!this.rows[id].isProcessing) {
      this.rows[id].isProcessing = true;
      try {
        await this.bookingsService.saveSpecialBooking(this.rows[id].data);
        Object.assign(this.data.find(x => x.id === id), this.rows[id].data);
        this.rows[id].isEditting = false;
      }
      finally {
        this.rows[id].isProcessing = false;
      }
    }
  }

  private updateRows(): void {
    this.data.forEach(x => 
        this.rows[x.id] = {
          isEditting: false,
          isProcessing: false,
          data: {...x}
        }
    );
  }

}
