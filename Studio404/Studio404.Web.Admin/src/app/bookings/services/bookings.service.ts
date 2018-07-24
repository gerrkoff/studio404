import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookingUser } from '../models/booking-user';
import { BookingSimple } from '../models/booking-simple';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private URLUser = '/api/bookings/user';
  private URLSpecial = '/api/bookings/special';

  constructor (
    private http: HttpClient
  ) {}

  getUserBookings(): Observable<BookingUser[]> {
    return this.http.get<BookingUser[]>(this.URLUser);
  }

  cancelBooking(id: number): Promise<void> {
    return this.http.delete<void>(`${this.URLUser}/${id}`).toPromise();
  }

  getSpecialBookings(): Observable<BookingSimple[]> {
    return this.http.get<BookingSimple[]>(this.URLSpecial);
  }

  saveSpecialBooking(booking: BookingSimple): Promise<BookingSimple> {
    return this.http.post<BookingSimple>(this.URLSpecial, booking).toPromise();
  }

  deleteBooking(id: number): Promise<void> {
    return this.http.delete<void>(`${this.URLSpecial}/${id}`).toPromise();
  }
}
