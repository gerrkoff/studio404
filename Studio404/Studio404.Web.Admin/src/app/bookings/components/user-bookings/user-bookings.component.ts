import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { TableComponent } from '../../../common/components/table/table.component';
import { BookingUser } from '../../models/booking-user';
import { BookingsService } from '../../services/bookings.service';
import { BookingStatusEnum } from '../../models/booking-status-enum';

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

  protected async loadItemsCore(): Promise<BookingUser[]> {
    const data = await this.bookingsService.getUserBookings();
    return this.sort(data, 'from', false);
  }

  onCancelBooking(id: number): void {
    this.rowProcessingWrapper(id, async () => {
      await this.bookingsService.cancelBooking(id);
      this.loadedItems.find(x => x.id === id).status = BookingStatusEnum.Canceled;
    });
  }

  onCopy(text: string): void {
    this.copyTextToClipboard(text);
  }

  private copyTextToClipboard(text: string): void {
    const textArea = document.createElement("textarea");
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
    this.messageService.success('Successfully copied to clipboard')
  }
}
