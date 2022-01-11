import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { PaginationService } from 'src/app/services/pagination.service'

@Component({
  selector: 'app-filters-pages',
  templateUrl: './filters-pages.component.html'
})
export class FiltersPagesComponent implements OnInit, OnDestroy {
  dishesPerPage: number = 0
  selectedCount: number = 0
  subscription!: Subscription
  possibleDishesPerPage: number[] = []

  constructor(public paginationService: PaginationService) {}

  ngOnInit() {
    this.subscription = this.paginationService.pagesChangedEvent.subscribe((data: any) => {
      setTimeout(() => {
        this.selectedCount = this.dishesPerPage = data.dishesPerPage
        const possibleCounts = this.paginationService.getPossibleDishesPerPage()
        this.possibleDishesPerPage = possibleCounts
        const maxCount = this.possibleDishesPerPage[this.possibleDishesPerPage.length - 1]
        this.selectedCount = Math.min(maxCount, this.dishesPerPage) 
      }, 0)
    })
  }

  onCountChange() {
    this.paginationService.setDishesPerPageCount(+this.dishesPerPage)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
