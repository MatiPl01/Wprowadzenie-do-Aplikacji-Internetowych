import { Component, OnDestroy, OnInit, HostListener } from '@angular/core'
import { Subscription } from 'rxjs'
import { VisualizationService } from '../services/visualization.service'

@Component({
  selector: 'app-scroll-top-btn',
  templateUrl: './scroll-top-btn.component.html'
})
export class ScrollTopBtnComponent implements OnInit, OnDestroy {
  isHeaderVisible: boolean = false
  scrolledFarEnough: boolean = false
  minScrollY: number = 500

  subscription!: Subscription
  
  constructor(private visualizationService: VisualizationService) {}

  ngOnInit() {
    this.subscription = this.visualizationService.headerVisibilityChangedEvent.subscribe((isVisible: boolean) => {
      this.isHeaderVisible = isVisible
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    this.scrolledFarEnough = window.scrollY > this.minScrollY
  }

  onClick() {
    this.visualizationService.scrollY(0)
  }
}
