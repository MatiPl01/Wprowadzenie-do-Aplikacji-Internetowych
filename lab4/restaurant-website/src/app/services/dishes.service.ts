import { Injectable, EventEmitter } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Dish } from '../../shared/models/dish.model';
import { CurrencyService } from './currency.service';

const headers = {
  headers: new HttpHeaders ({
    'Content-type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  dishesChanged = new EventEmitter<Dish[]>()
  ratingChanged = new EventEmitter<Dish>()

  // json-server --watch -p 3000 src/assets/json/dishes.json
  private dishesJsonUrl: string = 'http://localhost:3000/dishes' 
  private dishes: Dish[] = []
  private minUnitPrice: number = Infinity
  private maxUnitPrice: number = 0
  private unitPriceCurrency: string = 'USD'
  maxDishID: number = 0

  // For now I will store information if an user rated a particular
  // dish in a Set below. After implementing database, I will be able
  // to distinguish users
  userRates: Set<Dish> = new Set()

  constructor(private http: HttpClient, private currencyService: CurrencyService) {
    this.http
      .get<Dish>(this.dishesJsonUrl)
      .subscribe(data => {
        this.loadDishesData(data)
        this.updateMaxUnitPrice()
        this.updateMinUnitPrice()
        this.dishesChanged.emit(this.dishes)
      })
  }

  loadDishesData(data: any) {
    data.forEach((dish: Dish) => {
      this.dishes.push(dish)
      this.maxDishID = Math.max(this.maxDishID, dish.id)
    })
  }

  getDishes(): Dish[] {
    return this.dishes.slice()
  }

  removeDish(dish: Dish) {
    this.http
      .delete<Dish>(`${this.dishesJsonUrl}/${dish.id}`)
      .subscribe(() => {
        const idx = this.dishes.findIndex((d: Dish) => d.id === dish.id)
        this.dishes.splice(idx, 1)
        this.dishesChanged.emit(this.getDishes())
        this.updateMinUnitPrice()
        this.updateMaxUnitPrice()
      })
      
      this.userRates.delete(dish)
  }

  addDish(dish: Dish) {
    this.maxDishID++
    this.http.post<Dish>(this.dishesJsonUrl, dish, headers).subscribe()
    this.dishes.push(dish)
    this.dishesChanged.emit(this.getDishes())
  }

  updateMinUnitPrice() {
    this.minUnitPrice = Infinity
    this.dishes.forEach((dish: Dish) => {
      const dishPrice = this.currencyService.exchangeAmount(dish.unitPrice, dish.currency, this.unitPriceCurrency)
      if (dishPrice < this.minUnitPrice) this.minUnitPrice = dishPrice
    })
  }

  updateMaxUnitPrice() {
    this.maxUnitPrice = 0
    this.dishes.forEach((dish: Dish) => {
      const dishPrice = this.currencyService.exchangeAmount(dish.unitPrice, dish.currency, this.unitPriceCurrency)
      if (dishPrice > this.maxUnitPrice) this.maxUnitPrice = dishPrice
    })
  }

  updateRating(dish: Dish, prevRate: number, currRate: number) {
    if (!this.userRates.has(dish)) {
      dish.rating = (dish.rating * dish.ratesCount + currRate) / (dish.ratesCount + 1)
      this.userRates.add(dish)
      dish.ratesCount++
    } else {
      dish.rating = (dish.rating * dish.ratesCount - prevRate + currRate) / dish.ratesCount
    }
    this.http.put<Dish>(`${this.dishesJsonUrl}/${dish.id}`, dish, headers).subscribe();
    
    const updatedDish = this.dishes.find(d => dish.id === d.id)
    updatedDish!.ratesCount = dish.ratesCount
    updatedDish!.rating = dish.rating
  }

  getReferenceCurrency() {
    return this.unitPriceCurrency
  }

  getMaxUnitPrice() {
    return this.maxUnitPrice
  }

  getMinUnitPrice() {
    return this.minUnitPrice
  }

  getValuesSet(attr: string): any {
    const result = new Set()
    // @ts-ignore
    this.dishes.forEach((dish: Dish) => result.add(dish[attr]))
    return result
  }
}
