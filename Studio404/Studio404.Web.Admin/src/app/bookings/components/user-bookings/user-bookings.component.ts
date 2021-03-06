import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { TableComponent } from '../../../common/components/table/table.component';
import { BookingUser } from '../../models/booking-user';
import { BookingsService } from '../../services/bookings.service';
import { BookingStatusEnum } from '../../models/booking-status-enum';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: [
    './user-bookings.component.css',
    '../../../common/styles/table.css'
  ]
})
export class UserBookingsComponent extends TableComponent<BookingUser> {

  protected itemSearchFieldName = 'userDisplayName';
  BookingStatusEnum = BookingStatusEnum;

  constructor(
    private bookingsService: BookingsService,
    private messageService: NzMessageService
  ) {
    super();
  }

  protected loadItemsCore(): Observable<BookingUser[]> {
    return this.bookingsService.getUserBookings().pipe(
      map(x => this.sort(x, 'from', false))
    );
  }

  onCancelBooking(id: number): void {
    const response = this.rowProcessingWrapper(id, () => this.bookingsService.cancelBooking(id));
    if (response) {
      response.subscribe({
        next: () => {
          this.loadedItems.find(x => x.id === id).status = BookingStatusEnum.Canceled;
          this.messageService.success(`Canceled booking [${id}]`);
        }
      });
    }
  }

  onCopy(text: string): void {
    this.copyTextToClipboard(text);
  }

  private copyTextToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    this.messageService.success('Successfully copied to clipboard');
  }
}
