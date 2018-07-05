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
  editCache: any;

  constructor(
    private bookingsService: BookingsService
  ) { }

  ngOnInit() {
    this.editCache = {};
    this.data = [];
    this.loadBookings();
  }

  private async loadBookings(): Promise<void> {
    this.data = await this.bookingsService.getSpecialBookings();
    this.updateEditCache();
  }

  onStartEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  onCancelEdit(id: number): void {
    this.editCache[id].edit = false;
  }

  onSaveEdit(id: number): void {
    Object.assign(this.data.find(x => x.id === id), this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  private updateEditCache(): void {
    this.data.forEach(x => 
        this.editCache[x.id] = {
          edit: false,
          data: {...x}
        }
    );
  }

}
