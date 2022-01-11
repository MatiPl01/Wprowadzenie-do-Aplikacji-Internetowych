import { Pipe, PipeTransform } from '@angular/core'
import { Dish } from 'src/app/shared/models/dish.model'
import { FiltersService } from '../services/filters.service'
import { PaginationService } from '../services/pagination.service'

@Pipe({
  name: 'filter'
})
export class FiltersPipe implements PipeTransform {
    filteredDishes: Dish[] = []

    constructor(private filtersService: FiltersService,
                private paginationService: PaginationService) {}

    transform(dishes: Dish[], filterAttr: string, triggerFiltering: any = 0) {
        if (!dishes.length) return []
        this.filteredDishes = dishes.filter((dish: Dish) => {
            // @ts-ignore
            return this.filtersService.getFilters(filterAttr)(dish)
        })
        this.paginationService.setDisplayedDishesCount(this.filteredDishes.length)
        return this.filteredDishes
    }
}
