import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { PaginationService } from '../../services/pagination.service'

@Component({
  selector: 'app-dishes-pagination',
  templateUrl: './dishes-pagination.component.html'
})
export class DishesPaginationComponent implements OnInit, OnDestroy {
  pagesCount: number = 1
  currentPage: number = 1
  @Input('maxDisplayed') maxDisplayedNumbersCount: number = 5

  pagesNumbers: number[] = []
  subscription!: Subscription

  constructor(private paginationService: PaginationService) {}

  ngOnInit(): void {
    // this.update(this.paginationService.getDataObject())
    this.subscription = this.paginationService.pagesChangedEvent.subscribe(this.update.bind(this))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  changeCurrentPage(clickedPageNum: number) {
    this.paginationService.setCurrentPage(clickedPageNum)
  }

  private updateMiddlePagesNumbers() {
    if (this.pagesCount < 3) this.pagesNumbers = []
    const middleCount = this.maxDisplayedNumbersCount - 2
    let startNum = this.currentPage - Math.floor(middleCount / 2)
    let endNum = startNum + middleCount - 1
    const lastPossible = this.pagesCount - 1

    if (startNum < 2) {
      endNum = Math.min(endNum + (2 - startNum), lastPossible)
      startNum = 2
    } else if (endNum > lastPossible) {
      startNum = Math.max(2, startNum - (endNum - lastPossible))
      endNum = lastPossible
    }

    const arr = []
    for (let i = startNum; i <= endNum; i++) arr.push(i)
    this.pagesNumbers = arr
  }

  private update(data: any): void {
    this.pagesCount = data.pagesCount
    this.currentPage = data.pageNum
    this.updateMiddlePagesNumbers()
  }
}
