import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PromoCode } from '../models/promo-code';
import { HttpProcessorService } from '../../common/services/http-processor.service';

@Injectable({
  providedIn: 'root'
})
export class PromoCodesService {

  private URL = '/api/promocodes';

  constructor (
    private http: HttpClient,
    private httpProcessor: HttpProcessorService
  ) {}

  getPromoCodes(): Observable<PromoCode[]> {
    return this.httpProcessor.process(
      this.http.get<PromoCode[]>(this.URL)
    );
  }

  savePromoCode(booking: PromoCode): Observable<PromoCode> {
    return this.httpProcessor.process(
      this.http.post<PromoCode>(this.URL, booking)
    );
  }

  deletePromoCode(id: number): Observable<void> {
    return this.httpProcessor.process(
      this.http.delete<void>(`${this.URL}/${id}`)
    );
  }
}
