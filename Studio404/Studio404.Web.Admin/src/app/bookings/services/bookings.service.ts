import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookingUser } from '../models/booking-user';
import { BookingSimple } from '../models/booking-simple';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private URLUser = '/api/bookings/user';
  private URLSpecial = '/api/bookings/special';

  constructor (
    private http: HttpClient
  ) {}

  getUserBookings(): Promise<BookingUser[]> {
    return this.http.get<BookingUser[]>(this.URLUser).toPromise();
  }

  cancelBooking(id: number): Promise<void> {
    return this.http.delete<void>(`${this.URLUser}/${id}`).toPromise();
  }

  getSpecialBookings(): Promise<BookingSimple[]> {
    return this.http.get<BookingSimple[]>(this.URLSpecial).toPromise();
  }

  saveSpecialBooking(booking: BookingSimple): Promise<BookingSimple> {
    return this.http.post<BookingSimple>(this.URLSpecial, booking).toPromise();
  }

  deleteBooking(id: number): Promise<void> {
    return this.http.delete<void>(`${this.URLSpecial}/${id}`).toPromise();
  }
}
