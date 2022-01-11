import { Component, Input, OnInit, AfterViewChecked } from '@angular/core';
import { Dish } from 'src/shared/models/dish.model';
import { OrderService } from 'src/app/services/order.service';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss']
})
export class BasketItemComponent implements OnInit, AfterViewChecked {
  @Input() dish!: Dish
  quantity: number = 0

  constructor(private orderService: OrderService, public currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.quantity = this.orderService.getQuantity(this.dish)
  }

  ngAfterViewChecked() {
    this.orderService.updateDishQuantity.subscribe(data => {
      if (this.dish.id === data.dish.id) this.quantity = data.quantity
    })
  }

  onRemoveClick() {
    this.orderService.updateBasket(this.dish, 0)
  }
}
