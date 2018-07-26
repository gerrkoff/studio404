import { Injectable } from '@angular/core';
import { Observable, noop } from 'rxjs';
import { map } from 'rxjs/operators';
import { PromoCode } from '../models/promo-code';
import { AppHttpClientService } from '../../common/services/app-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class PromoCodesService {

  private URL = '/api/promocodes';

  constructor (
    private http: AppHttpClientService
  ) {}

  getPromoCodes(): Observable<PromoCode[]> {
    return this.http.get<PromoCode[]>(this.URL).pipe(map(this.fixDates));
  }

  savePromoCode(booking: PromoCode): Observable<PromoCode> {
    booking.from = this.convertToUTC(booking.from);
    booking.to = this.convertToUTC(booking.to);
    return this.http.post<PromoCode>(this.URL, booking);
  }

  deletePromoCode(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }

  private convertToUTC(date: Date) {
    return new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(), date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()));
  }

  private fixDates(codes: PromoCode[]): PromoCode[] {
    codes.forEach(x => {
      x.from = new Date(x.from);
      x.to = new Date(x.to);
    });
    return codes;
  }
}
