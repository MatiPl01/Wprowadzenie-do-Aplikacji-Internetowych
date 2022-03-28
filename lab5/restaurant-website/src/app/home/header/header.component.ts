import { Component, AfterViewInit } from '@angular/core'
import { VisualizationService } from '../../services/visualization.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements AfterViewInit {
  headerEl!: HTMLElement
  observer: IntersectionObserver

  constructor(private visualizationService: VisualizationService) {
    this.visualizationService.notifyHeaderVisible(true)
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        this.visualizationService.notifyHeaderVisible(entry.isIntersecting)
      })
    })
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.headerEl = document.querySelector('.header')
    this.observer.observe(this.headerEl)
  }

  onScroll() {
    this.visualizationService.scrollY(this.headerEl.clientHeight + 1)
  }
}
