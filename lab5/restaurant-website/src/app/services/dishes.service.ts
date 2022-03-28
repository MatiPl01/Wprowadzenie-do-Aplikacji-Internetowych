import { Injectable, EventEmitter } from '@angular/core'

import { Dish } from 'src/app/shared/models/dish.model'
import { CurrencyService } from './currency.service'
import { ReviewsService } from './reviews.service'
import { WebRequestService } from './web-request.service'


@Injectable({
  providedIn: 'root'
})
export class DishesService {
  dishesChangedEvent = new EventEmitter<Dish[]>()
  dishAddedEvent = new EventEmitter<Dish>()
  dishRemovedEvent = new EventEmitter<Dish>()
  ratingChangedEvent = new EventEmitter<Dish>()
 
  private dishesMap: Map<string, Dish> = new Map()
  private dishesArray: Dish[] = []
  private minDishPrice: number = Infinity
  private maxDishPrice: number = 0

  areDishesLoaded: boolean = false

  constructor(private currencyService: CurrencyService,
              private webRequestService: WebRequestService) {
    this.webRequestService
      .get('dishes')
      .subscribe((res: any) => this.loadDishesData(res.data))
  }

  getDishes(): Dish[] {
    return [...this.dishesArray]
  }

  getDishWithID(id: string): Dish {
    // @ts-ignore
    return this.dishesMap.get(id)
  }

  removeDish(dish: Dish) {
    this.webRequestService
      .delete(`dishes/${dish._id}`)
      .subscribe(() => {
        this.dishesMap.delete(dish._id)
        this.dishesArray.splice(this.dishesArray.findIndex((d: Dish) => d._id === dish._id), 1)
        this.updateMinUnitPrice()
        this.updateMaxUnitPrice()
        this.dishesChangedEvent.emit(this.getDishes())
      })
  }

  addDish(dish: Dish) {
    // Add a dish to the database and get an object returned by this request
    // because it will have a proper id value set
    this.webRequestService.post('dishes', dish).subscribe((res: any) => {
      dish = res.data // Overwrite the old one dist
      this.dishesMap.set(dish._id, dish)
      this.insertSorted(dish)
      
      const dishPrice = this.currencyService.calcDishReferencePrice(dish)
      if (dishPrice > this.maxDishPrice) this.maxDishPrice = +dishPrice.toFixed(2)
      if (dishPrice < this.minDishPrice) this.minDishPrice = +dishPrice.toFixed(2)
  
      this.dishesChangedEvent.emit(this.getDishes())
    })
  }

  getMaxReferencePrice() {
    return this.maxDishPrice
  }

  getMinReferencePrice() {
    return this.minDishPrice
  }

  getValuesSet(attr: string): any {
    const result = new Set()
    // @ts-ignore
    for (let dish of this.dishesArray) result.add(dish[attr])
    return result
  }

  private loadDishesData(data: any) {
    data.forEach((dish: Dish) => {
      this.dishesMap.set(dish._id, dish)
      this.dishesArray.push(dish)
    })

    const sortBy = 'name'
    this.dishesArray.sort((d1: Dish, d2: Dish) => d1[sortBy] > d2[sortBy] ? 1 : -1)

    this.updateMaxUnitPrice()
    this.updateMinUnitPrice()
    this.areDishesLoaded = true
    this.dishesChangedEvent.emit(this.getDishes())
  }

  private updateMinUnitPrice() {
    this.minDishPrice = Infinity
    for (let dish of this.dishesArray) {
      const dishPrice = +this.currencyService.calcDishReferencePrice(dish).toFixed(2)
      if (dishPrice < this.minDishPrice) this.minDishPrice = dishPrice
    }
  }

  private updateMaxUnitPrice() {
    this.maxDishPrice = 0
    for (let dish of this.dishesArray) {
      const dishPrice = +this.currencyService.calcDishReferencePrice(dish).toFixed(2)
      if (dishPrice > this.maxDishPrice) this.maxDishPrice = dishPrice
    }
  }

  private insertSorted(dish: Dish, sortBy: string = 'name') {
    if (!this.dishesArray.length) this.dishesArray.push(dish)
    // @ts-ignore
    else if (dish[sortBy] <= this.dishesArray[0][sortBy]) this.dishesArray.unshift(dish)
    // @ts-ignore
    else if (dish[sortBy] >= this.dishesArray[this.dishesArray.length - 1][sortBy]) {
      this.dishesArray.push(dish)
    } 
    else {
      for (let i = 0; i < this.dishesArray.length - 1; i++) {
        // @ts-ignore
        if (this.dishesArray[i][sortBy] <= dish[sortBy] && dish[sortBy] <= this.dishesArray[i + 1][sortBy]) {
          this.dishesArray.splice(i, 0, dish)
          return
        }
      }
    }
  }
}
