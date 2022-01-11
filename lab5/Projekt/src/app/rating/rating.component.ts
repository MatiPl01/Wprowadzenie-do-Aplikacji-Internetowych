import { Component, EventEmitter, Input, OnInit, OnChanges, AfterViewInit, Output, ElementRef } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() allowUserRating: boolean = false
  @Input() value: number = 0
  @Output() valueChange = new EventEmitter<number>()
  displayedRating: number = 0
  hasUserRated: boolean = false // Indicates if an user left their own rating
  private isRendered: boolean = false

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.displayedRating = this.value
  }

  ngAfterViewInit(): void {
    this.displayRating()
    this.isRendered = true
  }

  ngOnChanges(): void {
    this.displayedRating = this.value
    if (this.isRendered) this.displayRating()
  }

  onRatingChange(event: Event): void {
    if (this.allowUserRating) {
      this.hasUserRated = true
      this.value = parseInt((<HTMLInputElement>event.target).value) / 2
      this.valueChange.emit(this.value)
      this.displayRating()
    }
  }

  onMouseEnter(rating: number): void {
    this.displayedRating = rating / 2
  }

  onMouseLeave(): void {
    this.displayedRating = this.value
  }

  getStarsNumbers(): number[] {
    return Array(10).fill(0).map((_, i) => 10 - i)
  }

  private displayRating(): void {
    const segmentsCount = +(2 * this.displayedRating).toFixed()
    if (segmentsCount > 0) {
      this.elRef.nativeElement.querySelector(`.rating__radio[value="${segmentsCount}"]`).checked = true
    }
  }
}
