import { Component, Input } from '@angular/core'
import { Dish } from 'src/app/shared/models/dish.model'

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html'
})
export class DishDetailsComponent {
  @Input() dish!: Dish
}
