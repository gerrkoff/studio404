import { Component, OnInit } from '@angular/core';
import { PromoCodesService } from '../../services/promo-codes.service';
import { PromoCode } from '../../models/promo-code';
import { TableEditableComponent } from '../../../common/components/table-editable/table-editable.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-promo-codes',
  templateUrl: './promo-codes.component.html',
  styleUrls: [
    './promo-codes.component.css',
    '../../../common/styles/table.css'
  ]
})
export class PromoCodesComponent extends TableEditableComponent<PromoCode> {

  protected itemSearchFieldName = 'code';

  constructor(
    private promoCodesService: PromoCodesService
  ) {
    super();
  }

  formatterPercent = value => `${value}%`;
  parserPercent = value => value.replace('%', '');

  protected loadItemsCore(): Observable<PromoCode[]> {
    return this.promoCodesService.getPromoCodes().pipe(
      map(x => this.sort(x, 'from', false))
    );
  }

  protected createNewItem(): PromoCode {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return {
      code: '',
      description: '',
      discount: 0,
      from: today,
      to: today,
      id: 0
    };
  }

  protected saveItem(id: number): Observable<PromoCode> {
    return this.promoCodesService.savePromoCode(this.table.rows[id].data);
  }

  protected deleteItem(id: number): Observable<void> {
    return this.promoCodesService.deletePromoCode(id);
  }

  protected validate(id: number): boolean {
    const row = this.table.rows[id];

    row.fieldInvalid['discount'] = false;
    row.fieldInvalid['from'] = false;
    row.fieldInvalid['to'] = false;
    row.fieldInvalid['code'] = row.data.code.length === 0;

    if (row.data.discount.toString() === '') {
      row.fieldInvalid['discount'] = true;
    }

    if (!row.data.from) {
      row.fieldInvalid['from'] = true;
    }

    if (!row.data.to) {
      row.fieldInvalid['to'] = true;
    }

    if (row.data.to && row.data.from && row.data.from > row.data.to) {
      row.fieldInvalid['from'] = true;
      row.fieldInvalid['to'] = true;
    }

    return !row.fieldInvalid['code'] && !row.fieldInvalid['discount'];
  }
}
