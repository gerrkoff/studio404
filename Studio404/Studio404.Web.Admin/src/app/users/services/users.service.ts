import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpProcessorService } from '../../common/services/http-processor.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private URL = '/api/users';

  constructor (
    private http: HttpClient,
    private httpProcessor: HttpProcessorService
  ) {}

  getUsers(): Observable<User[]> {
    return this.httpProcessor.process(
      this.http.get<User[]>(this.URL)
    );
  }

  updateAdminRole(userId: string, isAdmin: boolean): Observable<void> {
    return this.httpProcessor.process(
      this.http.post<void>(this.URL, {userId, isAdmin})
    );
  }
}
