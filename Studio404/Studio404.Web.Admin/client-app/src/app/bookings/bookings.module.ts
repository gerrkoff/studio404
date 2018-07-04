import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoCodesComponent } from './promo-codes/promo-codes.component';
import { HourCostsComponent } from './hour-costs/hour-costs.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PromoCodesComponent, HourCostsComponent]
})
export class BookingsModule { }
