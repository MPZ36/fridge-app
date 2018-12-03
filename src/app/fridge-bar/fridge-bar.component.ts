import { Component, OnInit } from '@angular/core';
import { Food } from '../food';
import { FoodsService } from '../foods.service';

@Component({
  selector: 'app-fridge-bar',
  templateUrl: './fridge-bar.component.html',
  styleUrls: ['./fridge-bar.component.scss']
})
export class FridgeBarComponent implements OnInit {

  units: String[] = ['kg', 'gr', 'l', 'ml', 'pc/s']
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

  add(name: string, amount: number, unit: string, expires: string): void {
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
