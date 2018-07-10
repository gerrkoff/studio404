import { Injectable } from '@angular/core';
import { User } from '../models/user';

const users: User[] = [
  { id: '1', phoneNumber: '', userName: 'bc6c0c01-c833-4825-a438-c6101203955f', displayName: 'Piotr Petrov', isAdmin: false },
  { id: '2', phoneNumber: '89271111111', userName: 'Ivan_Ivanov', displayName: 'Ivan_Ivanov', isAdmin: true },
  { id: '3', phoneNumber: '', userName: 'Alex', displayName: 'Alex', isAdmin: false },
  { id: '4', phoneNumber: '', userName: 'bc6c0c01-c833-4825-a438-c6101203955f', displayName: 'Piotr Petrov', isAdmin: false },
  { id: '5', phoneNumber: '89271111111', userName: 'Ivan_Ivanov', displayName: 'Ivan_Ivanov', isAdmin: true },
  { id: '6', phoneNumber: '', userName: 'Alex', displayName: 'Alex', isAdmin: false },
  { id: '7', phoneNumber: '', userName: 'bc6c0c01-c833-4825-a438-c6101203955f', displayName: 'Piotr Petrov', isAdmin: false },
  { id: '8', phoneNumber: '89271111111', userName: 'Ivan_Ivanov', displayName: 'Ivan_Ivanov', isAdmin: true },
  { id: '9', phoneNumber: '', userName: 'Alex', displayName: 'Alex', isAdmin: false },
  { id: '10', phoneNumber: '', userName: 'bc6c0c01-c833-4825-a438-c6101203955f', displayName: 'Piotr Petrov', isAdmin: false },
  { id: '11', phoneNumber: '89271111111', userName: 'Ivan_Ivanov', displayName: 'Ivan_Ivanov', isAdmin: true },
  { id: '12', phoneNumber: '', userName: 'Alex', displayName: 'Alex', isAdmin: false },
  { id: '13', phoneNumber: '', userName: 'bc6c0c01-c833-4825-a438-c6101203955f', displayName: 'Piotr Petrov', isAdmin: false },
  { id: '14', phoneNumber: '89271111111', userName: 'Ivan_Ivanov', displayName: 'Ivan_Ivanov', isAdmin: true },
  { id: '15', phoneNumber: '', userName: 'Alex', displayName: 'Alex', isAdmin: false },
  { id: '16', phoneNumber: '', userName: 'bc6c0c01-c833-4825-a438-c6101203955f', displayName: 'Piotr Petrov', isAdmin: false },
  { id: '17', phoneNumber: '89271111111', userName: 'Ivan_Ivanov', displayName: 'Ivan_Ivanov', isAdmin: true },
  { id: '18', phoneNumber: '', userName: 'Alex', displayName: 'Alex', isAdmin: false },
  { id: '19', phoneNumber: '', userName: 'bc6c0c01-c833-4825-a438-c6101203955f', displayName: 'Piotr Petrov', isAdmin: false },
  { id: '20', phoneNumber: '89271111111', userName: 'Ivan_Ivanov', displayName: 'Ivan_Ivanov', isAdmin: true },
  { id: '21', phoneNumber: '', userName: 'Alex', displayName: 'Alex', isAdmin: false }
];

function DataCopy(): User[] {
  return users.map(x => ({...x}));
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  getUsers(): Promise<User[]> {
    return new Promise(resolve => setTimeout(() => resolve(DataCopy()), 3000));
  }

  updateAdminRole(userId: string, isAdmin: boolean): Promise<void> {
    users.find(x => x.id === userId).isAdmin = isAdmin;

    return new Promise(resolve => setTimeout(resolve, 3000));
  }
}
