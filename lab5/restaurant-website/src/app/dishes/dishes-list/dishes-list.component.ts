import { Component, OnDestroy, OnInit } from '@angular/core'
import { Dish } from 'src/app/shared/models/dish.model'
import { DishesService } from 'src/app/services/dishes.service'
import { CurrencyService } from 'src/app/services/currency.service'
import { FiltersService } from 'src/app/services/filters.service'
import { PaginationService } from 'src/app/services/pagination.service'
import { Subscription } from 'rxjs'
import { ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html'
})
export class DishesListComponent implements OnInit, OnDestroy {
  dishes: Dish[] = []
  
  pageIdx: number = 1
  dishesPerPage: number = 10
  filteringTrigger: number = 0
  paginationTrigger: number = 0

  subscriptions: Subscription[] = []
  queryParamsSubscription!: Subscription
 
  constructor(private activatedRoute: ActivatedRoute,
              public paginationService: PaginationService,
              private currencyService: CurrencyService, 
              public dishesService: DishesService, 
              public filtersService: FiltersService) {}

  ngOnInit(): void {
    this.dishes = this.dishesService.getDishes()
    // Setup event observers
    this.subscriptions.push(
      this.dishesService.dishesChangedEvent.subscribe((dishes: Dish[]) => {
        this.dishes = dishes
        this.paginationService.setDisplayedDishesCount(dishes.length)
        this.recalculatePages()
        if (!this.queryParamsSubscription) this.subscribeQueryParams()
        
      }),
      this.filtersService.filtersChangedEvent.subscribe(this.refilterDishes.bind(this)),
      this.paginationService.pagesChangedEvent.subscribe(this.updatePages.bind(this))
    )
  }

  ngAfterViewInit() { // Try to load stored data
    // IMPORTANT - is dishes are stored in a DishesService, they
    // will be loaded from this service after this component is
    // initialized. This ensures that all sub-components are
    // loaded, thus a proper number of dishes per page and a proper
    // page number can be displayed (subscriptions to pagesChangedEvent
    // in these component aren't too late). We also need to setTimeout
    // as changing DOM isn't allowed immediately after element was
    // rendered
    setTimeout(() => {
      this.filtersService.loadInitialFilters()
      if (this.dishes.length) {
        this.paginationService.setDisplayedDishesCount(this.dishes.length, false)
        this.paginationService.setQueryParams(this.activatedRoute.snapshot.queryParams)
        if (!this.queryParamsSubscription) this.subscribeQueryParams()
      }
    }, 0)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  onRemoveDish(dish: Dish) {
    this.dishesService.removeDish(dish)
  }

  getClassObj(dish: Dish) {
    const dishPrice = +this.currencyService.calcDishReferencePrice(dish).toFixed(2)
    return {
      cheap: dishPrice === this.dishesService.getMinReferencePrice(),
      expensive: dishPrice === this.dishesService.getMaxReferencePrice()
    }
  }

  private refilterDishes() {
    this.filteringTrigger = (this.filteringTrigger + 1) % 2
  }

  private recalculatePages() {
    this.paginationTrigger = (this.paginationTrigger + 1) % 2
  }

  private updatePages(data: any): void {
    this.dishesPerPage = data.dishesPerPage
    this.pageIdx = data.pageNum - 1
  }

  private subscribeQueryParams(): void {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.paginationService.setQueryParams(params)
    })
    this.subscriptions.push(this.queryParamsSubscription)
  }
}
