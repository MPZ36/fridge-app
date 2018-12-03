import { Component, OnInit } from '@angular/core';
import { Food } from '../food';
import { FoodsService } from '../foods.service';

@Component({
  selector: 'app-fridge-bar',
  templateUrl: './fridge-bar.component.html',
  styleUrls: ['./fridge-bar.component.scss']
})
export class FridgeBarComponent implements OnInit {

  foods: Food[];
  IsHidden = true;

  constructor(private foodService: FoodsService) { }

  ngOnInit() {
    this.getFoods();
  }

  onSelect() {
    this.IsHidden = !this.IsHidden;
  }

  getFoods(): void {
    this.foodService.getFoods().subscribe(foods => this.foods = foods);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.foodService.addFood({ name } as Food)
      .subscribe(food => {
        this.foods.push(food);
      });
  }
}
