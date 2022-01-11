import { Injectable, EventEmitter } from '@angular/core'
import { Dish } from 'src/app/shared/models/dish.model'
import { CurrencyService } from './currency.service'
import { PaginationService } from './pagination.service'

class FiltersObject {
    category = new Set()
    cuisine = new Set()
    unitPrice = {
        min: 0,
        max: Infinity
    }
    rating = {
        min: 0,
        max: Infinity
    }

    clone(): FiltersObject {
        const newObj = new FiltersObject()
        newObj.category = new Set(this.category)
        newObj.cuisine = new Set(this.cuisine)
        newObj.unitPrice = Object.assign({}, this.unitPrice)
        newObj.rating = Object.assign({}, this.rating)
        return newObj
    }
}

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
    filtersChangedEvent = new EventEmitter<FiltersObject>()

    private initialFilters: FiltersObject = new FiltersObject()
    private appliedFilters: FiltersObject = new FiltersObject()

    private filtersFunctions: any = {
        category: (dish: Dish) => {
            return !this.appliedFilters.category.size || this.appliedFilters.category.has(dish.category)
        },
        cuisine: (dish: Dish) => {
            return !this.appliedFilters.cuisine.size || this.appliedFilters.cuisine.has(dish.cuisine)
        },
        unitPrice: (dish: Dish) => {
            const min = this.appliedFilters.unitPrice.min
            const max = this.appliedFilters.unitPrice.max
            const price = +this.currencyService.calcDishReferencePrice(dish).toFixed(2)
            return min <= price && price <= max
        },
        rating: (dish: Dish) => {
            const min = this.appliedFilters.rating.min
            const max = this.appliedFilters.rating.max
            return min <= dish.rating && dish.rating <= max
        }
    }

    constructor(private paginationService: PaginationService,
                private currencyService: CurrencyService) {
        this.loadInitialFilters()
    }

    setInitialFilters(filterAttr: string, filters: any): void {
        // @ts-ignore
        this.initialFilters[filterAttr] = filters
    }

    getInitialFilters(filterAttr: string): any {
        // @ts-ignore
        return this.initialFilters[filterAttr]
    }

    addFilter(filterAttr: string, filterValue: any, notifyChanges: boolean = true): void {
        // @ts-ignore
        this.appliedFilters[filterAttr].add(filterValue)
        if (notifyChanges) this.notifyChanges()
    }

    addAllFilters(filterAttr: string, filterValues: any, notifyChanges: boolean = true): void {
        // @ts-ignore
        this.appliedFilters[filterAttr] = new Set(filterValues)
        if (notifyChanges) this.notifyChanges()
    }

    removeFilter(filterAttr: string, filterValue: any, notifyChanges: boolean = true): void {
        // @ts-ignore
        this.appliedFilters[filterAttr].delete(filterValue)
        if (notifyChanges) this.notifyChanges()
    }

    removeAllFilters(filterAttr: string, notifyChanges: boolean = true): void {
        // @ts-ignore
        this.appliedFilters[filterAttr].clear()
        if (notifyChanges) this.notifyChanges()
    }

    setRangeFilter(filterAttr: string, minValue: number, maxValue: number, notifyChanges: boolean = true): void {
        // @ts-ignore
        this.appliedFilters[filterAttr] = {
            min: minValue,
            max: maxValue
        }
        if (notifyChanges) this.notifyChanges()
    }
    
    getFilters(filterAttr: string): any {
        return this.filtersFunctions[filterAttr]
    }

    loadInitialFilters(): void {
        this.appliedFilters = this.initialFilters.clone()
        this.notifyChanges()
        this.paginationService.notifyChanges()
    }

    notifyChanges(): void {
        this.filtersChangedEvent.emit(this.appliedFilters)
    }
}
