import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { Dish } from 'src/app/shared/models/dish.model'
import { CurrencyService } from 'src/app/services/currency.service'

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html'
})
export class DishComponent implements OnInit {
  @Input() dish!: Dish
  @Input() classObj!: Object
  @Output() removeDish = new EventEmitter<Dish>()
  remainingUnits!: number
  unitPrice!: number
  currency!: string
  quantity: number = 0

  constructor(public currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.remainingUnits = this.dish.stock
  }

  onRemoveClick() {
    this.removeDish.emit(this.dish)
  }

  onQuantityChange(quantity: number) {
    this.quantity = quantity
  }
}
