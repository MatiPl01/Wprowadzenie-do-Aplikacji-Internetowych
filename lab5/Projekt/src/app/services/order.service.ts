import { Injectable, EventEmitter } from '@angular/core'
import { CurrencyService } from './currency.service'

import { Dish } from 'src/app/shared/models/dish.model'

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    updateCartContentsEvent = new EventEmitter<Dish[]>()
    updateDishQuantityEvent = new EventEmitter<{ dish: Dish, quantity: number }>()
    updateTotalQuantityEvent = new EventEmitter<number>()
    updateTotalPriceEvent = new EventEmitter<number>()
    totalQuantity: number = 0
    totalPrice: number = 0
    private cart: Map<Dish, number> = new Map()

    constructor(private currencyService: CurrencyService) { }

    updateCart(dish: Dish, quantity: number) {
        const deltaQuantity = quantity - (this.cart.get(dish) || 0)
        this.totalQuantity += deltaQuantity
        this.totalPrice += deltaQuantity * this.currencyService.exchangeAmount(dish.unitPrice, dish.currency, this.currencyService.getReferenceCurrency())
        if (quantity === 0) this.cart.delete(dish)
        else this.cart.set(dish, quantity)

        this.updateCartContentsEvent.emit(this.getCartDishes())
        this.updateTotalQuantityEvent.emit(this.totalQuantity)
        this.updateDishQuantityEvent.emit({ dish, quantity })
        this.updateTotalPriceEvent.emit(this.totalPrice)
    }

    getQuantity(dish: Dish): number {
        return this.cart.get(dish) || 0
    }

    getCartDishes(): Dish[] {
        return [...this.cart.keys()]
    }
}
