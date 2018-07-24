import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.get<PromoCode[]>(this.URL);
  }

  savePromoCode(booking: PromoCode): Observable<PromoCode> {
    return this.http.post<PromoCode>(this.URL, booking);
  }

  deletePromoCode(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
