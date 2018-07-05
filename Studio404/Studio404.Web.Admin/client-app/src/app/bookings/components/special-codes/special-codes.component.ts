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
  editCache: any;

  constructor(
    private bookingsService: BookingsService
  ) { }

  ngOnInit() {
    this.displayData = [];
    this.editCache = {};
    this.loadBookings();
  }

  private async loadBookings(): Promise<void> {
    this.bookings = await this.bookingsService.getSpecialBookings();
    this.displayData = [...this.bookings];
    this.updateEditCache();
  }

  onStartEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  onCancelEdit(id: number): void {
    this.editCache[id].edit = false;
  }

  onSaveEdit(id: number): void {
    const index = this.bookings.findIndex(x => x.id === id);
    this.bookings[index] = {...this.editCache[id].data};    
    this.displayData = [...this.bookings];
    this.editCache[id].edit = false;
  }

  private updateEditCache(): void {
    this.bookings.forEach(x => 
        this.editCache[x.id] = {
          edit: false,
          data: {...x}
        }
    );
  }

}
