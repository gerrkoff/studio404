import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private URL = '/api/users';

  constructor (
    private http: HttpClient
  ) {}

  getUsers(): Promise<User[]> {
    return this.http.get<User[]>(this.URL).toPromise();
  }

  updateAdminRole(userId: string, isAdmin: boolean): Promise<void> {
    return this.http.post<void>(this.URL, {userId, isAdmin}).toPromise();
  }
}
