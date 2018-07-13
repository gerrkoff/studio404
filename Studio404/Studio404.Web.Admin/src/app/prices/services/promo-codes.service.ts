import { Injectable } from '@angular/core';
import { PromoCode } from '../models/promo-code';

const data: PromoCode[] = [
  {id: 1, code: 'abcd', description: 'Some text here not so short', discount: 10, activate: true,
  from: new Date('2018-01-01T10:30:00'), to: new Date('2018-01-01T12:30:00')},
  {id: 2, code: 'qwerty', description: 'Some text here not so short', discount: 5, activate: false,
  from: new Date('2018-01-01T10:30:00'), to: new Date('2018-01-01T12:30:00')},
  {id: 3, code: 'something', description: 'Some text here not so short', discount: 50, activate: true,
  from: new Date('2018-01-01T10:30:00'), to: new Date('2018-01-01T12:30:00')},
  {id: 4, code: '112233', description: 'Some text here not so short', discount: 10, activate: false,
  from: new Date('2018-01-01T10:30:00'), to: new Date('2018-01-01T12:30:00')},
  {id: 5, code: 'asdzx', description: 'Some text here not so short', discount: 15, activate: true,
  from: new Date('2018-01-01T10:30:00'), to: new Date('2018-01-01T12:30:00')}
];

function DataCopy(): PromoCode[] {
  return data.map(x => ({...x}));
}

@Injectable({
  providedIn: 'root'
})
export class PromoCodesService {

  getPromoCodes(): Promise<PromoCode[]> {
    return new Promise(resolve => setTimeout(() => resolve(DataCopy()), 3000));
  }

  savePromoCode(booking: PromoCode): Promise<PromoCode> {
    const newItem = Object.assign(new PromoCode(), {...booking, activate: true});

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

  deactivatePromoCode(id: number): Promise<void> {
    const index = data.findIndex(x => x.id === id);
    if (index > -1) {
      data.splice(index, 1);
    }

    return new Promise(resolve => setTimeout(resolve, 3000));
  }
}
