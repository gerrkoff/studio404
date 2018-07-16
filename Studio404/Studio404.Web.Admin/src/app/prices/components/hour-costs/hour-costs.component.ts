import { Component, OnInit } from '@angular/core';
import { HourCost } from '../../models/hour-cost';
import { TableEditableComponent } from '../../../common/components/table-editable/table-editable.component';
import { HourCostsService } from '../../services/hour-costs.service';
import { DiscountDayTypeEnum } from '../../models/discount-day-type-enum';

@Component({
  selector: 'app-hour-costs',
  templateUrl: './hour-costs.component.html',
  styleUrls: [
    './hour-costs.component.css',
    '../../../common/styles/table.css'
  ]
})
export class HourCostsComponent extends TableEditableComponent<HourCost> implements OnInit {
  
  protected itemSearchFieldName = '';
  discountDayTypes: {value: number, label: string}[];
  DiscountDayTypeEnum = DiscountDayTypeEnum;

  constructor(
    private hourCostsService: HourCostsService
  ) {
    super();
  }

  formatterMoney = value => `${value}₽`;
  parserMoney = value => value.replace('₽', '');

  ngOnInit() {
    super.ngOnInit();

    this.discountDayTypes = [];
    for (let item in DiscountDayTypeEnum) {
      let itemNum = Number(item);
      if (!isNaN(itemNum) && itemNum !== 0) {
        this.discountDayTypes.push({value: itemNum, label: DiscountDayTypeEnum[itemNum]});
      }
    }
  }

  protected async loadItemsCore(): Promise<HourCost[]> {
    const data = await this.hourCostsService.getHourCosts();
    return this.sort(data, 'from', false);
  }

  protected createNewItem(): HourCost {
    const defaultHourCost = this.loadedItems.find(x => x.isGeneral === true);
    if (defaultHourCost) {
      return {
        cost: defaultHourCost.cost,
        start: defaultHourCost.start,
        end: defaultHourCost.end,
        dayType: DiscountDayTypeEnum.All,
        isGeneral: false,
        id: 0
      }
    }
    else {
      return {
        cost: 100,
        start: 0,
        end: 23,
        dayType: DiscountDayTypeEnum.All,
        isGeneral: false,
        id: 0
      }
    }
  }
  protected validate(id: number): boolean {
    const row = this.table.rows[id];
    if(row.data.start > row.data.end) {
      row.fieldInvalid['start'] = true;
      row.fieldInvalid['end'] = true;
      return false;
    }
    return true;
  }
  protected saveItem(id: number): Promise<HourCost> {
    return this.hourCostsService.saveHourCost(this.table.rows[id].data);
  }
  protected deleteItem(id: number): Promise<void> {
    return this.hourCostsService.deleteHourCost(id);
  }
}
