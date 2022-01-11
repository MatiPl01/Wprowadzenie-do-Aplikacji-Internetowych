import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Dish } from 'src/shared/models/dish.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-dish-order',
  templateUrl: './dish-order.component.html',
  styleUrls: ['./dish-order.component.scss']
})
export class DishOrderComponent implements OnInit {
  @Input() dish!: Dish
  @Output() changeQuantity = new EventEmitter<number>()
  quantity!: number

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.quantity = this.orderService.getQuantity(this.dish)
    this.orderService.updateDishQuantity.subscribe(data => {
      this.updateQuantity(data.dish, data.quantity)
    })
    this.emitEvents(this.quantity)
  }

  onIncrement(event: Event) {
    event.preventDefault()
    this.emitEvents(Math.min(this.quantity + 1, this.dish.stock))
  }

  onDecrement(event: Event) {
    event.preventDefault()
    this.emitEvents(Math.max(this.quantity - 1, 0))
  }

  onInput(event: Event) {
    let value: number = +((<HTMLInputElement>event.target).value) || 0
    this.emitEvents(Math.max(Math.min(value, this.dish.stock), 0))
  }

  private emitEvents(quantity: number) {
    this.changeQuantity.emit(quantity)
    this.orderService.updateBasket(this.dish, quantity)
  }

  private updateQuantity(dish: Dish, quantity: number) {
    if (dish.id === this.dish.id) this.quantity = quantity
  }
}
