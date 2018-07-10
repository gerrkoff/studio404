import { Injectable } from '@angular/core';
import { BookingUser } from '../models/booking-user';
import { BookingSimple } from '../models/booking-simple';
import { BookingStatusEnum } from '../models/booking-status-enum';

const bookings: BookingUser[] = [
  {id: 1, code: '1223', cost: 250, from: new Date('2018-01-01T10:30:00'), to: new Date('2018-01-01T12:30:00'),
  status: BookingStatusEnum.Paid, userId: '1', userDisplayName: 'Ivan_Ivanov', userPhone: '89277123123'},
  {id: 2, code: '1223', cost: 250, from: new Date('2018-01-02T12:30:00'), to: new Date('2018-01-02T14:30:00'),
   status: BookingStatusEnum.Paid, userId: '2', userDisplayName: 'Stepan Stepanov', userPhone: '89575557775'},
  {id: 3, code: '1223', cost: 250, from: new Date('2018-01-02T15:00:00'), to: new Date('2018-01-02T19:30:00'),
  status: BookingStatusEnum.Paid, userId: '3', userDisplayName: 'Horse SQL', userPhone: '84957333222'},
  {id: 4, code: '1223', cost: 250, from: new Date('2018-01-03T10:30:00'), to: new Date('2018-01-03T12:30:00'),
   status: BookingStatusEnum.Paid, userId: '4', userDisplayName: 'Qwerty', userPhone: '88462236478'},
  {id: 5, code: '1223', cost: 250, from: new Date('2018-01-03T15:30:00'), to: new Date('2018-01-03T16:30:00'),
   status: BookingStatusEnum.Paid, userId: '1', userDisplayName: 'Ivan_Ivanov', userPhone: '89277123123'},
  {id: 6, code: '1223', cost: 250, from: new Date('2018-01-03T16:30:00'), to: new Date('2018-01-03T19:30:00'),
   status: BookingStatusEnum.Unpaid, userId: '2', userDisplayName: 'Stepan Stepanov', userPhone: '89575557775'},
  {id: 7, code: '1223', cost: 250, from: new Date('2018-01-03T20:30:00'), to: new Date('2018-01-03T22:30:00'),
   status: BookingStatusEnum.Paid, userId: '3', userDisplayName: 'Horse SQL', userPhone: '84957333222'},
  {id: 8, code: '1223', cost: 250, from: new Date('2018-01-04T10:30:00'), to: new Date('2018-01-04T12:30:00'),
   status: BookingStatusEnum.Canceled, userId: '4', userDisplayName: 'Qwerty', userPhone: '88462236478'},
  {id: 9, code: '1223', cost: 250, from: new Date('2018-01-04T14:30:00'), to: new Date('2018-01-04T16:30:00'),
   status: BookingStatusEnum.Unpaid, userId: '1', userDisplayName: 'Ivan_Ivanov', userPhone: '89277123123'},
  {id: 10, code: '1223', cost: 250, from: new Date('2018-01-04T18:00:00'), to: new Date('2018-01-04T20:30:00'),
   status: BookingStatusEnum.Paid, userId: '2', userDisplayName: 'Stepan Stepanov', userPhone: '89575557775'},
  {id: 11, code: '1223', cost: 250, from: new Date('2018-01-05T10:30:00'), to: new Date('2018-01-01T20:30:00'),
   status: BookingStatusEnum.Unpaid, userId: '3', userDisplayName: 'Horse SQL', userPhone: '84957333222'},
  {id: 12, code: '1223', cost: 250, from: new Date('2018-01-05T20:30:00'), to: new Date('2018-01-01T22:30:00'),
  status: BookingStatusEnum.Unpaid, userId: '4', userDisplayName: 'Qwerty', userPhone: '88462236478'},
  {id: 13, code: '1223', cost: 0, from: new Date('2018-01-01T00:00:00'), to: new Date('2018-01-02T00:00:00'),
  status: BookingStatusEnum.Special, userId: '', userDisplayName: '', userPhone: ''},
  {id: 14, code: '1223', cost: 0, from: new Date('2018-01-02T00:00:00'), to: new Date('2018-01-04T00:00:00'),
   status: BookingStatusEnum.Special, userId: '', userDisplayName: '', userPhone: ''},
  {id: 15, code: '1223', cost: 0, from: new Date('2018-01-04T00:00:00'), to: new Date('2018-01-04T16:00:00'),
   status: BookingStatusEnum.Special, userId: '', userDisplayName: '', userPhone: ''},
  {id: 16, code: '1223', cost: 0, from: new Date('2018-01-04T16:00:00'), to: new Date('2018-01-05T23:59:00'),
  status: BookingStatusEnum.Special, userId: '', userDisplayName: '', userPhone: ''},
  {id: 17, code: '1223', cost: 0, from: new Date('2018-01-04T16:00:00'), to: new Date('2018-01-05T23:59:00'),
  status: BookingStatusEnum.None, userId: '', userDisplayName: '', userPhone: ''}
];

function DataCopy(): BookingUser[] {
  return bookings.map(x => ({...x}));
}

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  getSpecialBookings(): Promise<BookingSimple[]> {
    return new Promise(resolve => setTimeout(() => resolve(DataCopy().filter(x => x.status === BookingStatusEnum.Special)), 3000));
  }

  getUserBookings(): Promise<BookingUser[]> {
    return new Promise(resolve => setTimeout(() => resolve(DataCopy().filter(x => x.status !== BookingStatusEnum.Special)), 3000));
  }

  saveSpecialBooking(booking: BookingSimple): Promise<BookingSimple> {
    const newItem = Object.assign(new BookingUser(), {...booking, status: BookingStatusEnum.Special});

    if (newItem.id < 0) {
      const lastId = bookings[bookings.length - 1].id;
      newItem.id = lastId + 1;
      bookings.push(newItem);
    }
    else {      
      const oldItem = bookings.find(x => x.id === newItem.id);
      Object.assign(oldItem, newItem);
    }
    const newItemCopy = {...newItem};

    return new Promise(resolve => setTimeout(() => resolve(newItemCopy), 3000));
  }

  deleteBooking(id: number): Promise<void> {
    const index = bookings.findIndex(x => x.id === id);
    if (index > -1) {
      bookings.splice(index, 1);
    }

    return new Promise(resolve => setTimeout(resolve, 3000));
  }

  cancelBooking(id: number): Promise<void> {
    bookings.find(x => x.id === id).status = BookingStatusEnum.Canceled;
    return new Promise(resolve => setTimeout(resolve, 3000));
  }
}
