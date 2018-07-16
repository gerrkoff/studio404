import { Injectable } from '@angular/core';
import { HourCost } from '../models/hour-cost';
import { DiscountDayTypeEnum } from '../models/discount-day-type-enum';

const data: HourCost[] = [
  {id: 1, start: 10, end: 23, dayType: DiscountDayTypeEnum.All, cost: 250, isGeneral: true},
  {id: 2, start: 10, end: 17, dayType: DiscountDayTypeEnum.Workday, cost: 150, isGeneral: false},
  {id: 3, start: 10, end: 13, dayType: DiscountDayTypeEnum.Weekend, cost: 100, isGeneral: false},
  {id: 4, start: 22, end: 23, dayType: DiscountDayTypeEnum.All, cost: 200, isGeneral: false}
];

function DataCopy(): HourCost[] {
  return data.map(x => ({...x}));
}

@Injectable({
  providedIn: 'root'
})
export class HourCostsService {

  getHourCosts(): Promise<HourCost[]> {
    return new Promise(resolve => setTimeout(() => resolve(DataCopy()), 3000));
  }

  saveHourCost(hourCost: HourCost): Promise<HourCost> {
    const newItem = Object.assign(new HourCost(), {...hourCost});

    if (newItem.id < 0) {
      const lastId = data[data.length - 1].id;
      newItem.id = lastId + 1;
      data.push(newItem);
    } else {
      const oldItem = data.find(x => x.id === newItem.id);
      Object.assign(oldItem, newItem);
    }
    const newItemCopy = {...newItem};

    return new Promise(resolve => setTimeout(() => resolve(newItemCopy), 3000));
  }

  deleteHourCost(id: number): Promise<void> {
    const index = data.findIndex(x => x.id === id);
    if (index > -1) {
      data.splice(index, 1);
    }

    return new Promise(resolve => setTimeout(resolve, 3000));
  }
}
