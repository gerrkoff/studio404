import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { MyCommonModule } from '../common/my-common.module';
import { UserBookingsComponent } from './components/user-bookings/user-bookings.component';
import { SpecialCodesComponent } from './components/special-codes/special-codes.component';
import { BookingStatusTagComponent } from './components/booking-status-tag/booking-status-tag.component';

registerLocaleData(en);

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    MyCommonModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  declarations: [UserBookingsComponent, SpecialCodesComponent, BookingStatusTagComponent]
})
export class BookingsModule { }
