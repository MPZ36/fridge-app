import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Food } from './food';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const foods = [
      { id: 11, name: 'Apple', amount: 4, unit: 'piece', expires: '12.12.2018' },
      { id: 12, name: 'Banana', amount: 2, unit: 'piece', expires: '13.12.2018' },
      { id: 13, name: 'Joghurt', amount: 150, unit: 'mililiter', expires: '04.12.2018' },
      { id: 14, name: 'Honey', amount: 500, unit: 'gram', expires: '12.12.2019' }
    ];
    return { foods };
  }

  genId(foods: Food[]): number {
    return foods.length > 0 ? Math.max(...foods.map(food => food.id)) + 1 : 11;
  }
}
