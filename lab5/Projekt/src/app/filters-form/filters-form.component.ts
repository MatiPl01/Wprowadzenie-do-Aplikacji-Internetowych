import { Component, OnDestroy, OnInit } from '@angular/core'
import { DishesService } from '../services/dishes.service'
import { FiltersService } from '../services/filters.service'
import { CurrencyService } from '../services/currency.service'
import { LabelType, Options } from '@angular-slider/ngx-slider'
import { Subscription } from 'rxjs'

type dropdownEventObj = { filterAttr: string, value: any }

@Component({
  selector: 'app-filters-form',
  templateUrl: './filters-form.component.html'
})
export class FiltersFormComponent implements OnInit, OnDestroy {
  categoryFilterAttr: string = 'category'
  cuisineFilterAttr: string = 'cuisine'
  priceFilterAttr: string = 'unitPrice'
  ratingFilterAttr: string = 'rating'
  priceStep = .5
  ratingStep = .05
  categoriesList: string[] = []
  cuisinesList: string[] = []
  priceSteps: number = 0
  ratingSteps: number = 0
  minPrice: number = 0
  maxPrice: number = 0
  minRating: number = 0
  maxRating: number = 0

  settings = {
    idField: 'filterID',
    textField: 'filterValue',
    allowSearchFilter: true,
    singleSelection: false,
    enableCheckAll: true,
    itemsShowLimit: 2,
    selectAllText: 'Zaznacz wszystkie',
    unSelectAllText: 'Odznacz wszystkie',
  }

  placeholderOptions: Options = {
    floor: 0,
    ceil: 0
  }

  // Current filters values
  priceValues = {
    min: 0,
    max: 0
  }

  ratingValues = {
    min: 0,
    max: 0
  }

  selectedCategories = []
  selectedCuisines = []

  priceOptions: Options = Object.assign({}, this.placeholderOptions)
  ratingOptions: Options = Object.assign({}, this.placeholderOptions)

  subscriptions: Subscription[] = []

  constructor(private filtersService: FiltersService, private dishesService: DishesService, private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.dishesService.dishesChangedEvent.subscribe(this.initialize.bind(this)),
      this.currencyService.currencyChangedEvent.subscribe(this.updatePriceSlider.bind(this))
    )
  }

  ngAfterViewInit(): void {
    if (this.dishesService.areDishesLoaded) {
      setTimeout(() => {
        this.initialize()
      }, 0)
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  getDropdownList(filterAttr: string) {
    return [...(this.dishesService.getValuesSet(filterAttr) || [])]
  }

  onItemSelected(eventObj: dropdownEventObj) {
    this.filtersService.addFilter(eventObj.filterAttr, eventObj.value);
  }

  onItemDeSelected(eventObj: dropdownEventObj) {
    this.filtersService.removeFilter(eventObj.filterAttr, eventObj.value)
  }

  onSelectedAll(eventObj: dropdownEventObj) {
    this.filtersService.addAllFilters(eventObj.filterAttr, eventObj.value)
  }

  onDeSelectedAll(eventObj: dropdownEventObj) {
    this.filtersService.removeAllFilters(eventObj.filterAttr)
  }

  onRangeChanged(eventObj: { filterAttr: string, min: number, max: number }) {
    let min, max
    if (eventObj.filterAttr === this.priceFilterAttr) {
      // Convert to the reference currency
      min = this.currencyService.fromCurrentToReference(this.stepToValue(eventObj.min, this.priceSteps, this.minPrice, this.maxPrice))
      max = this.currencyService.fromCurrentToReference(this.stepToValue(eventObj.max, this.priceSteps, this.minPrice, this.maxPrice))
    } else {
      min = this.stepToValue(eventObj.min, this.ratingSteps, this.minRating, this.maxRating)
      max = this.stepToValue(eventObj.max, this.ratingSteps, this.minRating, this.maxRating)
    }

    this.filtersService.setRangeFilter(eventObj.filterAttr, min, max)
  }

  onFiltersReset(): void {
    this.selectedCategories = []
    this.selectedCuisines = []
    this.filtersService.loadInitialFilters()
    this.reset()
  }

  private initialize() {
    this.setServiceInitialFilters()
    this.filtersService.loadInitialFilters()
    this.reset()
  }

  private reset(): void {
    this.categoriesList = [...(this.dishesService.getValuesSet(this.categoryFilterAttr) || [])]
    this.cuisinesList = [...(this.dishesService.getValuesSet(this.cuisineFilterAttr) || [])]
    this.updatePriceSlider()
    this.resetRatingsSlider()
    this.resetPriceSlider()
  }

  private setServiceInitialFilters(): void {
    const ratings = this.dishesService.getValuesSet('rating')

    this.filtersService.setInitialFilters('unitPrice', {
      min: this.dishesService.getMinReferencePrice(),
      max: this.dishesService.getMaxReferencePrice()
    })
    this.filtersService.setInitialFilters('rating', {
      min: +Math.min(...ratings).toFixed(2),
      max: +Math.max(...ratings).toFixed(2)
    })
  }

  private updatePriceOptions(): void {
    const currency = this.currencyService.getCurrentCurrencySymbol()
    this.priceOptions = {
      floor: 0,
      ceil: this.priceSteps,
      translate: (value: number, label: LabelType): string => {
        const res = this.stepToValue(value, this.priceSteps, this.minPrice, this.maxPrice) || 0
        return value >= 0 ? currency + res.toFixed(2) : ''
      }
    }
  }

  private updateRatingOptions(): void {
    this.ratingOptions = {
      floor: 0,
      ceil: this.ratingSteps,
      translate: (value: number, label: LabelType): string => {
        const res = this.stepToValue(value, this.ratingSteps, this.minRating, this.maxRating) || 0
        return value >= 0 ? res.toFixed(2) : ''
      }
    }
  }

  private calcStepsCount(min: number, max: number, step: number): number {
    return +Math.ceil((max - min) / step).toFixed()
  }

  private stepToValue(step: number, steps: number, min: number, max: number): number {
    return min + (max - min) / steps * step
  }

  private resetPriceSlider() {
    this.priceValues.min = 0
    this.priceValues.max = this.priceSteps
  }

  private updatePriceSlider() {
    this.minPrice = +(this.currencyService.fromReferenceToCurrent(this.dishesService.getMinReferencePrice())).toFixed(2)
    this.maxPrice = +(this.currencyService.fromReferenceToCurrent(this.dishesService.getMaxReferencePrice())).toFixed(2)
    this.priceSteps = this.calcStepsCount(this.minPrice, this.maxPrice, this.priceStep)
    this.updatePriceOptions()
  }

  private resetRatingsSlider(): void {
    const ratings = this.filtersService.getInitialFilters('rating')
    this.minRating = ratings.min
    this.maxRating = ratings.max
    this.ratingSteps = this.calcStepsCount(this.minRating, this.maxRating, this.ratingStep)
    this.ratingValues.min = 0
    this.ratingValues.max = this.ratingSteps
    this.updateRatingOptions()
  }
}
