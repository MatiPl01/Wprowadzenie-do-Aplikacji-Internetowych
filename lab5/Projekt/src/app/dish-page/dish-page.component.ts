import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CurrencyService } from '../services/currency.service';
import { DishesService } from '../services/dishes.service';
import { PaginationService } from '../services/pagination.service';
import { VisualizationService } from '../services/visualization.service';
import { Dish } from '../shared/models/dish.model';

@Component({
  selector: 'app-dish-page',
  templateUrl: './dish-page.component.html'
})
export class DishPageComponent implements OnInit, OnDestroy {
  dish!: Dish
  dishID!: string
  subscriptions: Subscription[] = []

  constructor(private elRef: ElementRef,
              private activatedRoute: ActivatedRoute,
              private visualizationService: VisualizationService,
              private dishesService: DishesService,
              public paginationService: PaginationService,
              public currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.dishID = this.activatedRoute.snapshot.params['id']
    this.loadDishData()

    this.subscriptions.push(
      this.dishesService.dishesChangedEvent.subscribe(this.loadDishData.bind(this))
    )
  }

  ngAfterViewInit() {
    this.visualizationService.scrollY(0, false)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  onReviewsClick() {
    this.scrollToReviews()
  }

  getImagesAlts(): string[] {
    return new Array(this.dish.images.gallery.length).fill('').map(_ => this.dish.name)
  }

  getRatingText(): string {
    const lastDigit = this.dish.ratesCount % 10
    if (lastDigit === 0 || 5 <= lastDigit && lastDigit <= 9 || lastDigit === 1 && this.dish.ratesCount > 10 || this.dish.ratesCount >= 10 && this.dish.ratesCount <= 21) return 'ocen'
    if (lastDigit === 1) return 'ocena'
    return 'oceny'
  }

  private loadDishData(): void {
    this.dish = this.dishesService.getDishWithID(this.dishID)
  }

  private scrollToReviews(): void {
    const reviewsEl = this.elRef.nativeElement.querySelector('.dish-page__reviews')
    this.visualizationService.scrollY(reviewsEl.getBoundingClientRect().top - 100)
  }
}
