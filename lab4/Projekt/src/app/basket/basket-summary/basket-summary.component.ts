import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { OrderService } from 'src/app/services/order.service';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  totalQuantity: number = 0
  totalPrice: number = 0

  constructor(private orderService: OrderService, public currencyService: CurrencyService, public dishesService: DishesService) { }

  ngOnInit(): void {
    this.orderService.updateTotalPrice.subscribe((price: number) => this.updatePrice(price))
    this.orderService.updateTotalQuantity.subscribe((quantity: number) => this.updateQuantity(quantity))
  }

  updateQuantity(quantity: number) {
    this.totalQuantity = quantity
  }

  updatePrice(price: number) {
    this.totalPrice = price
  }
}
