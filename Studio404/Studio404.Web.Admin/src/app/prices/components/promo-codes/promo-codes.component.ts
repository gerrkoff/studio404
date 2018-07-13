import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../common/components/table.component';
import { PromoCodesService } from '../../services/promo-codes.service';
import { PromoCode } from '../../models/promo-code';

@Component({
  selector: 'app-promo-codes',
  templateUrl: './promo-codes.component.html',
  styleUrls: [
    './promo-codes.component.css',
    '../../../common/styles/table.css'
  ]
})
export class PromoCodesComponent extends TableComponent<PromoCode> {

  itemSearchFieldName = 'code';

  constructor(
    private promoCodesService: PromoCodesService
  ) {
    super();
  }

  async loadItemsCore(): Promise<PromoCode[]> {
    const data = await this.promoCodesService.getPromoCodes();
    return this.sort(data, 'from', false);
  }

  onSaveEdit(id: number): void {
    this.rowUpdatingWrapper(id, () =>
      this.promoCodesService.savePromoCode(this.table.rows[id].data)
    );
  }

  onDeleteRow(id: number): void {
    if (id < 0) {
      this.deleteRow(id);
      return;
    }

    this.rowProcessingWrapper(id, async () => {
      await this.promoCodesService.deletePromoCode(id);
      this.deleteRow(id);
    });
  }
}
