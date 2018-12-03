import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Food } from '../food';
import { FoodsService } from '../foods.service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss']
})
export class FoodDetailComponent implements OnInit {
  @Input() food: Food;

  units: String[] = ['kg', 'gr', 'l', 'ml', 'pc/s']

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodsService,
    private location: Location

  ) { }

  ngOnInit() {
    this.getFood();
  }

  getFood(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.foodService.getFood(id)
      .subscribe(food => this.food = food);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.foodService.updateFood(this.food)
      .subscribe(() => this.goBack());
  }

}
