import { Component, OnInit, Input } from '@angular/core';
import { Dish } from 'src/shared/models/dish.model';
import { DishesService } from '../../../services/dishes.service';

@Component({
  selector: 'app-dish-rating',
  templateUrl: './dish-rating.component.html',
  styleUrls: ['./dish-rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() dish!: Dish
  currRate: number = 0
  prevRate: number = 0

  constructor(private dishesService: DishesService) { }

  ngOnInit(): void {}

  onRateChange(event: Event) {
    this.currRate = parseInt((<HTMLInputElement>event.target).value) / 2
    this.dishesService.updateRating(this.dish, this.prevRate, this.currRate)
    this.prevRate = this.currRate
  }
}
