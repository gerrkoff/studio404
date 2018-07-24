import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingUser } from '../models/booking-user';
import { BookingSimple } from '../models/booking-simple';
import { AppHttpClientService } from '../../common/services/app-http-client.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private URLUser = '/api/bookings/user';
  private URLSpecial = '/api/bookings/special';

  constructor (
    private http: AppHttpClientService
  ) {}

  getUserBookings(): Observable<BookingUser[]> {
    return this.http.get<BookingUser[]>(this.URLUser).pipe(map(this.fixDates));
  }

  cancelBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URLUser}/${id}`);
  }

  getSpecialBookings(): Observable<BookingSimple[]> {
    return this.http.get<BookingSimple[]>(this.URLSpecial).pipe(map(this.fixDates));
  }

  saveSpecialBooking(booking: BookingSimple): Observable<BookingSimple> {
    return this.http.post<BookingSimple>(this.URLSpecial, booking);
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URLSpecial}/${id}`);
  }

  private fixDates<T extends BookingSimple>(bookings: T[]): T[] {
    bookings.forEach(x => {
      x.from = new Date(x.from);
      x.to = new Date(x.to);
    });
    return bookings;
  }
}
