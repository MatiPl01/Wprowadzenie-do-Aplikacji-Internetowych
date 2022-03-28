import { Injectable, EventEmitter } from '@angular/core'
import { CurrencyService } from './currency.service'

import { Dish } from 'src/shared/models/dish.model'

@Injectable({
  providedIn: 'root'
})
export class OrderService {
    openBasket = new EventEmitter<void>()
    updateBasketContents = new EventEmitter<Dish[]>()
    updateDishQuantity = new EventEmitter<{dish: Dish, quantity: number}>()
    updateTotalQuantity = new EventEmitter<number>()
    updateTotalPrice = new EventEmitter<number>()
    private basket: Map<Dish, number> = new Map()
    totalQuantity: number = 0
    totalPrice: number = 0

    constructor(private currencyService: CurrencyService) {}

    updateBasket(dish: Dish, quantity: number) {
        const deltaQuantity = quantity - (this.basket.get(dish) || 0)
        this.totalQuantity += deltaQuantity
        this.totalPrice += this.currencyService.calcAmount(deltaQuantity * dish.unitPrice, dish.currency)
        if (quantity === 0) this.basket.delete(dish)
        else this.basket.set(dish, quantity)

        this.updateBasketContents.emit([...this.basket.keys()])
        this.updateTotalQuantity.emit(this.totalQuantity)
        this.updateDishQuantity.emit({ dish, quantity })
        this.updateTotalPrice.emit(this.totalPrice)
    } 

    onBtnCartClick() {
        this.openBasket.emit()
    }

    getQuantity(dish: Dish): number {
        return this.basket.get(dish) || 0
    }
}

