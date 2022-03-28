import { Component, OnDestroy, OnInit } from '@angular/core'
import { VisualizationService } from '../services/visualization.service'
import { OrderService } from '../services/order.service'
import { Subscription } from 'rxjs'
import { PaginationService } from '../services/pagination.service'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit, OnDestroy {
  defaultPaginationQueryParams: Object = {}
  isHeaderVisible: boolean = false

  subscription!: Subscription

  constructor(public orderService: OrderService,
              public paginationService: PaginationService,
              private visualizationService: VisualizationService) {}

  ngOnInit(): void {
    this.defaultPaginationQueryParams = this.paginationService.getDefaultQueryParams()
    this.subscription = this.visualizationService.headerVisibilityChangedEvent.subscribe((isVisible: boolean) => {
      this.isHeaderVisible = isVisible
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
