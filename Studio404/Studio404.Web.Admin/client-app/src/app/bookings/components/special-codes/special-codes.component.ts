import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import { BookingSimple } from '../../models/booking-simple';

@Component({
  selector: 'app-special-codes',
  templateUrl: './special-codes.component.html',
  styleUrls: ['./special-codes.component.css']
})
export class SpecialCodesComponent implements OnInit {

  bookings: BookingSimple[];
  displayData: BookingSimple[];
  sortName: string;
  sortValue: string;

  constructor(
    private bookingsService: BookingsService
  ) { }

  ngOnInit() {
    this.displayData = [];
    this.loadBookings();
  }

  private async loadBookings(): Promise<void> {
    this.bookings = await this.bookingsService.getSpecialBookings();
    this.onSort({key: 'from', value: 'descend'});
  }

  onSort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;

    if (!this.bookings)
      return;

    const data = [...this.bookings];
    if (this.sortName) {
      this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
    } else {
      this.displayData = data;
    }
  }
}
