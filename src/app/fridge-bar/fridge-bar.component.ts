import { Component, OnInit } from '@angular/core';
import { Food } from '../food';
import { FoodsService } from '../foods.service';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';


@Component({
  selector: 'app-fridge-bar',
  templateUrl: './fridge-bar.component.html',
  styleUrls: ['./fridge-bar.component.scss'],
  // Add this:
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class FridgeBarComponent implements OnInit {

  foods$: Observable<Food[]>;
  private searchTerms = new Subject<string>();

  units: String[] = ['', 'kilogram', 'gram', 'liter', 'mililiter', 'piece/s']
  foods: Food[];
  IsHidden = true;
  toggle = true;
  status = 'Enable';

  constructor(private foodService: FoodsService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.getFoods();

    this.foods$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.foodService.searchFoods(term)),
    );
  }

  onSelect() {
    this.IsHidden = !this.IsHidden;
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
  }

  getFoods(): void {
    this.foodService.getFoods().subscribe(foods => this.foods = foods);
  }

  add(name: string, amount: number, unit: string, expires: Date): void {
    name = name.trim();
    if (!name) { return; }
    this.foodService.addFood({ name, amount, unit, expires } as Food)
      .subscribe(food => {
        this.foods.push(food);
      });
  }

  deleteFood(food: Food): void {
    this.foods = this.foods.filter(h => h !== food);
    this.foodService.deleteFood(food).subscribe();
  }


}
