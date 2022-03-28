import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core'
import { Dish } from 'src/app/shared/models/dish.model'
import { OrderService } from 'src/app/services/order.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-dish-order',
  templateUrl: './dish-order.component.html'
})
export class DishOrderComponent implements OnInit, OnDestroy {
  @Input() dish!: Dish
  @Output() changeQuantity = new EventEmitter<number>()
  quantity!: number
  subscription!: Subscription

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.quantity = this.orderService.getQuantity(this.dish)
    this.subscription = this.orderService.updateDishQuantityEvent.subscribe(data => {
      this.updateQuantity(data.dish, data.quantity)
    })
    this.emitEvents(this.quantity)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
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
    this.orderService.updateCart(this.dish, quantity)
  }

  private updateQuantity(dish: Dish, quantity: number) {
    if (dish._id === this.dish._id) this.quantity = quantity
  }
}
