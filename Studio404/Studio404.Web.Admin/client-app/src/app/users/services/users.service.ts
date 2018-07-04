import { Injectable } from '@angular/core';
import { User } from '../models/user';

const Users: User[] = [
  { Id: '0f63719c-5c7a-4a2c-ae44-3ffb9af8c60c', PhoneNumber: '', UserName: 'bc6c0c01-c833-4825-a438-c6101203955f', DisplayName: 'Piotr Petrov', IsAdmin: false },
  { Id: 'c4d30639-a3a1-4ce0-bdf0-8a43ec613c42', PhoneNumber: '89271111111', UserName: 'Ivan_Ivanov', DisplayName: 'Ivan_Ivanov', IsAdmin: true },
  { Id: '50dd13f9-4c7f-47a9-b2ba-9698a77519d6', PhoneNumber: '', UserName: 'Alex', DisplayName: 'Alex', IsAdmin: false }
];

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  getUsers(): Promise<User[]> {
    return Promise.resolve(Users);
  }

  updateAdminRole(userId: string, isAdmin: boolean): void {
    Users.find(x => x.Id === userId).IsAdmin = isAdmin;
  }
}
