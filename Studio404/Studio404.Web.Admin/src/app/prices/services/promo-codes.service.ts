import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PromoCode } from '../models/promo-code';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromoCodesService {

  private URL = '/api/promocodes';

  constructor (
    private http: HttpClient
  ) {}

  getPromoCodes(): Observable<PromoCode[]> {
    return this.http.get<PromoCode[]>(this.URL);
  }

  savePromoCode(booking: PromoCode): Promise<PromoCode> {
    return this.http.post<PromoCode>(this.URL, booking).toPromise();
  }

  deletePromoCode(id: number): Promise<void> {
    return this.http.delete<void>(`${this.URL}/${id}`).toPromise();
  }
}
