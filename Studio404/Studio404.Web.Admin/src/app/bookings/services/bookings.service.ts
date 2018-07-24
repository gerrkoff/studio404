import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingUser } from '../models/booking-user';
import { BookingSimple } from '../models/booking-simple';
import { HttpProcessorService } from '../../common/services/http-processor.service';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private URLUser = '/api/bookings/user';
  private URLSpecial = '/api/bookings/special';

  constructor (
    private http: HttpClient,
    private httpProcessor: HttpProcessorService
  ) {}

  getUserBookings(): Observable<BookingUser[]> {
    return this.httpProcessor.process(
      this.http.get<BookingUser[]>(this.URLUser)
    );
  }

  cancelBooking(id: number): Observable<void> {
    return this.httpProcessor.process(
      this.http.delete<void>(`${this.URLUser}/${id}`)
    );
  }

  getSpecialBookings(): Observable<BookingSimple[]> {
    return this.httpProcessor.process(
      this.http.get<BookingSimple[]>(this.URLSpecial)
    );
  }

  saveSpecialBooking(booking: BookingSimple): Observable<BookingSimple> {
    return this.httpProcessor.process(
      this.http.post<BookingSimple>(this.URLSpecial, booking)
    );
  }

  deleteBooking(id: number): Observable<void> {
    return this.httpProcessor.process(
      this.http.delete<void>(`${this.URLSpecial}/${id}`)
    );
  }
}
