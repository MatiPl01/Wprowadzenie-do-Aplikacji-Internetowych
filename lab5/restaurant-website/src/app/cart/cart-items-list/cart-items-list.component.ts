import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { OrderService } from 'src/app/services/order.service'
import { Dish } from '../../shared/models/dish.model'

@Component({
  selector: 'app-cart-items-list',
  templateUrl: './cart-items-list.component.html'
})
export class CartItemsListComponent implements OnInit, OnDestroy {
  cartDishes: Dish[] = []
  subscription!: Subscription

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.cartDishes = this.orderService.getCartDishes()

    this.subscription = this.orderService.updateCartContentsEvent.subscribe((dishes: Dish[]) => {
      this.cartDishes = dishes
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
