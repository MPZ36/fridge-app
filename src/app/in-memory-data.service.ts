import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Food } from './food';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const foods = [
      { id: 11, name: 'Apple', amount: 4, unit: 'pc/s', expires: '2012-12-12' },
      { id: 12, name: 'Banana', amount: 2, unit: 'pc/s', expires: '2018-07-12' },
      { id: 13, name: 'Joghurt', amount: 150, unit: 'l', expires: '2018-04-12' },
      { id: 14, name: 'Honey', amount: 500, unit: 'gr', expires: '2019-12-12' }
    ];
    return { foods };
  }

  genId(foods: Food[]): number {
    return foods.length > 0 ? Math.max(...foods.map(food => food.id)) + 1 : 11;
  }
}
