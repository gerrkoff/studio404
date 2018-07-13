import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { PromoCodesComponent } from './components/promo-codes/promo-codes.component';
import { HourCostsComponent } from './components/hour-costs/hour-costs.component';
import { MyCommonModule } from '../common/my-common.module';

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
  declarations: [PromoCodesComponent, HourCostsComponent]
})
export class PricesModule { }
