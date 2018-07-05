import { Injectable } from '@angular/core';
import { BookingUser } from '../models/booking-user';
import { BookingSimple } from '../models/booking-simple';
import { BookingStatusEnum } from '../models/booking-status-enum';

const bookings: BookingUser[] = [
  {Id: 1, Code: '1223', Cost: 250, From: new Date(2018, 0, 1, 10, 30), To: new Date(2018, 0, 1, 12, 30), Status: BookingStatusEnum.Paid, UserId: '1', UserDisplayName: 'Ivan_Ivanov', UserPhone: '89277123123'},
  {Id: 2, Code: '1223', Cost: 250, From: new Date(2018, 0, 2, 12, 30), To: new Date(2018, 0, 2, 14, 30), Status: BookingStatusEnum.Paid, UserId: '2', UserDisplayName: 'Stepan Stepanov', UserPhone: '89575557775'},
  {Id: 3, Code: '1223', Cost: 250, From: new Date(2018, 0, 2, 15, 0), To: new Date(2018, 0, 2, 19, 30), Status: BookingStatusEnum.Paid, UserId: '3', UserDisplayName: 'Horse SQL', UserPhone: '84957333222'},
  {Id: 4, Code: '1223', Cost: 250, From: new Date(2018, 0, 3, 10, 30), To: new Date(2018, 0, 3, 12, 30), Status: BookingStatusEnum.Paid, UserId: '4', UserDisplayName: 'Qwerty', UserPhone: '88462236478'},
  {Id: 5, Code: '1223', Cost: 250, From: new Date(2018, 0, 3, 15, 30), To: new Date(2018, 0, 3, 16, 30), Status: BookingStatusEnum.Paid, UserId: '1', UserDisplayName: 'Ivan_Ivanov', UserPhone: '89277123123'},
  {Id: 6, Code: '1223', Cost: 250, From: new Date(2018, 0, 3, 16, 30), To: new Date(2018, 0, 3, 19, 30), Status: BookingStatusEnum.Unpaid, UserId: '2', UserDisplayName: 'Stepan Stepanov', UserPhone: '89575557775'},
  {Id: 7, Code: '1223', Cost: 250, From: new Date(2018, 0, 3, 20, 30), To: new Date(2018, 0, 3, 22, 30), Status: BookingStatusEnum.Paid, UserId: '3', UserDisplayName: 'Horse SQL', UserPhone: '84957333222'},
  {Id: 8, Code: '1223', Cost: 250, From: new Date(2018, 0, 4, 10, 30), To: new Date(2018, 0, 4, 12, 30), Status: BookingStatusEnum.Canceled, UserId: '4', UserDisplayName: 'Qwerty', UserPhone: '88462236478'},
  {Id: 9, Code: '1223', Cost: 250, From: new Date(2018, 0, 4, 14, 30), To: new Date(2018, 0, 4, 16, 30), Status: BookingStatusEnum.Unpaid, UserId: '1', UserDisplayName: 'Ivan_Ivanov', UserPhone: '89277123123'},
  {Id: 10, Code: '1223', Cost: 250, From: new Date(2018, 0, 4, 18, 30), To: new Date(2018, 0, 4, 20, 30), Status: BookingStatusEnum.Paid, UserId: '2', UserDisplayName: 'Stepan Stepanov', UserPhone: '89575557775'},
  {Id: 11, Code: '1223', Cost: 250, From: new Date(2018, 0, 5, 10, 30), To: new Date(2018, 0, 1, 20, 30), Status: BookingStatusEnum.Unpaid, UserId: '3', UserDisplayName: 'Horse SQL', UserPhone: '84957333222'},
  {Id: 12, Code: '1223', Cost: 250, From: new Date(2018, 0, 5, 20, 30), To: new Date(2018, 0, 1, 22, 30), Status: BookingStatusEnum.Unpaid, UserId: '4', UserDisplayName: 'Qwerty', UserPhone: '88462236478'},
  {Id: 13, Code: '1223', Cost: 0, From: new Date(2018, 0, 1, 0, 0), To: new Date(2018, 0, 2, 0, 0), Status: BookingStatusEnum.Special, UserId: '', UserDisplayName: '', UserPhone: ''},
  {Id: 14, Code: '1223', Cost: 0, From: new Date(2018, 0, 2, 0, 0), To: new Date(2018, 0, 4, 0, 0), Status: BookingStatusEnum.Special, UserId: '', UserDisplayName: '', UserPhone: ''},
  {Id: 15, Code: '1223', Cost: 0, From: new Date(2018, 0, 4, 0, 0), To: new Date(2018, 0, 4, 16, 0), Status: BookingStatusEnum.Special, UserId: '', UserDisplayName: '', UserPhone: ''},
  {Id: 16, Code: '1223', Cost: 0, From: new Date(2018, 0, 4, 16, 0), To: new Date(2018, 0, 5, 23, 59), Status: BookingStatusEnum.Special, UserId: '', UserDisplayName: '', UserPhone: ''}
];

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  getSpecialBookings(): Promise<BookingSimple[]> {
    return new Promise(resolve => setTimeout(() => resolve(bookings.filter(x => x.Status === BookingStatusEnum.Special)), 1000));
  }

  getUserBookings(): Promise<BookingUser[]> {
    return new Promise(resolve => setTimeout(() => resolve(bookings.filter(x => x.Status !== BookingStatusEnum.Special)), 1000));
  }
}
