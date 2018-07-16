import { Component, OnInit } from '@angular/core';
import { PromoCodesService } from '../../services/promo-codes.service';
import { PromoCode } from '../../models/promo-code';
import { TableEditableComponent } from '../../../common/components/table-editable/table-editable.component';

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

  protected async loadItemsCore(): Promise<PromoCode[]> {
    const data = await this.promoCodesService.getPromoCodes();
    return this.sort(data, 'from', false);
  }

  protected createNewItem(): PromoCode {
    return {
      code: '',
      description: '',
      discount: 0,
      from: new Date(),
      to: new Date(),
      id: 0
    };
  }

  protected saveItem(id: number): Promise<PromoCode> {
    return this.promoCodesService.savePromoCode(this.table.rows[id].data);
  }

  protected deleteItem(id: number): Promise<void> {
    return this.promoCodesService.deletePromoCode(id);
  }

  protected validate(id: number): boolean {
    const row = this.table.rows[id];
    row.fieldInvalid['code'] = row.data.code.length === 0;
    return !row.fieldInvalid['code'];
  }
}
