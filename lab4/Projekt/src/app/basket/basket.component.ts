import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { OrderService } from '../services/order.service';
import { Dish } from 'src/shared/models/dish.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  isOpen: boolean = false
  dishes: Dish[] = []

  constructor(public currencyService: CurrencyService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.updateBasketContents.subscribe((data: Dish[]) => this.dishes = data)
    this.orderService.openBasket.subscribe(() => this.openBasket())
  }

  onClose() {
    this.isOpen = false
  }

  openBasket() {
    this.isOpen = true
  }
}
