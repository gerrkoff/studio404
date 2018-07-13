import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor (
    private http: HttpClient
  ) {}

  logout(): Promise<void> {
    return this.http.delete<void>('/login').toPromise();
  }
}
