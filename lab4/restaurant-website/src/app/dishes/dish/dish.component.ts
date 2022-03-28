import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Dish } from '../../../shared/models/dish.model'
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {
  @Input() dish!: Dish
  @Input() classObj!: Object
  @Output() removeDish = new EventEmitter<Dish>();
  remainingUnits!: number
  unitPrice!: number
  currency!: string
  quantity: number = 0

  constructor(public currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.remainingUnits = this.dish.stock
    this.unitPrice = this.getUnitPrice()
    this.currency = this.getCurrencySymbol()
  }

  onRemoveClick() {
    this.removeDish.emit(this.dish)
  }

  onQuantityChange(quantity: number) {
    this.quantity = quantity
  }

  getUnitPrice(): number {
    return this.currencyService.calcAmount(this.dish.unitPrice, this.dish.currency)
  }

  getCurrencySymbol(): string {
    return this.currencyService.getCurrentCurrencySymbol()
  }
}
