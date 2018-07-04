import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { SpecialCodesComponent } from './special-codes/special-codes.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserBookingsComponent, SpecialCodesComponent]
})
export class PricesModule { }
