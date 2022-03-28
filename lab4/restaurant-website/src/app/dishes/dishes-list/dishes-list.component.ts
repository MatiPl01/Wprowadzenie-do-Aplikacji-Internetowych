import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/shared/models/dish.model';
import { DishesService } from 'src/app/services/dishes.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { FiltersService } from 'src/app/services/filters.service';

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss']
})
export class DishesListComponent implements OnInit {
  dishes: Dish[] = []

  filtersFunctions: any = {
    category: () => true,
    cuisine: () => true,
    unitPrice: () => true,
    rating: () => true
  }
 
  constructor(public dishesService: DishesService, private currencyService: CurrencyService, public filtersService: FiltersService) {}

  ngOnInit(): void {
    this.dishesService.dishesChanged.subscribe((dishes: Dish[]) => this.dishes = dishes)
    this.filtersService.filteringCriteriaChanged.subscribe((filterAttr: string) => this.updateFilters(filterAttr))
  }

  onRemoveDish(dish: Dish) {
    this.dishesService.removeDish(dish)
  }

  getClassObj(dish: Dish) {
    const dishPrice = this.currencyService.exchangeAmount(dish.unitPrice, dish.currency, this.dishesService.getReferenceCurrency())
    return {
      cheap: dishPrice === this.dishesService.getMinUnitPrice(),
      expensive: dishPrice === this.dishesService.getMaxUnitPrice()
    }
  }

  updateFilters(filterAttr: string) {
    this.filtersFunctions[filterAttr] = this.filtersService.getFilters(filterAttr)
  }
}
