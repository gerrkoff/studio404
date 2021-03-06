import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    private hourCostsService: HourCostsService,
    protected messageService: NzMessageService
  ) {
    super(messageService);
  }

  formatterMoney = value => `${value}₽`;
  parserMoney = value => value.replace('₽', '');

  ngOnInit() {
    super.ngOnInit();

    this.discountDayTypes = [];
    for (const item of Object.keys(DiscountDayTypeEnum)) {
      const itemNum = Number(item);
      if (!isNaN(itemNum) && itemNum !== 0) {
        this.discountDayTypes.push({value: itemNum, label: DiscountDayTypeEnum[itemNum]});
      }
    }
  }

  protected loadItemsCore(): Observable<HourCost[]> {
    return this.hourCostsService.getHourCosts().pipe(
      map(x => this.sort(x, 'start', true))
    );
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
      };
    } else {
      return {
        cost: 100,
        start: 0,
        end: 23,
        dayType: DiscountDayTypeEnum.All,
        isGeneral: false,
        id: 0
      };
    }
  }
  protected validate(id: number): boolean {
    const row = this.table.rows[id];

    row.fieldInvalid['cost'] = false;
    row.fieldInvalid['start'] = false;
    row.fieldInvalid['end'] = false;

    if (row.data.cost.toString() === '') {
      row.fieldInvalid['cost'] = true;
    }

    if (row.data.start.toString() === '') {
      row.fieldInvalid['start'] = true;
    }

    if (row.data.end.toString() === '') {
      row.fieldInvalid['end'] = true;
    }

    if (row.data.start.toString() !== '' && row.data.end.toString() !== '' && row.data.start > row.data.end) {
      row.fieldInvalid['start'] = true;
      row.fieldInvalid['end'] = true;
    }

    return !row.fieldInvalid['cost'] && !row.fieldInvalid['start'] && !row.fieldInvalid['end'];
  }
  protected saveItem(id: number): Observable<HourCost> {
    return this.hourCostsService.saveHourCost(this.table.rows[id].data);
  }
  protected deleteItem(id: number): Observable<void> {
    return this.hourCostsService.deleteHourCost(id);
  }
}
