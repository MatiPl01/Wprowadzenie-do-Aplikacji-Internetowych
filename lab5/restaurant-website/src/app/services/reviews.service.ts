import { Injectable, EventEmitter } from '@angular/core'
import { Review } from '../shared/models/review.model';
import { FiltersService } from './filters.service';
import { Dish } from '../shared/models/dish.model';
import { WebRequestService } from './web-request.service';
import { DishesService } from './dishes.service';

@Injectable({
    providedIn: 'root'
})
export class ReviewsService {
    constructor(private dishesService: DishesService,
                private filtersService: FiltersService,
                private webRequestService: WebRequestService) {}

    addReview(dishID: string, review: Review): void {
        const dish = this.dishesService.getDishWithID(dishID)
        dish.reviews.push(review)
        this.updateRating(dish, review.rating)
        this.webRequestService.patch(`dishes/${dishID}`, dish).subscribe()
    }

    updateRating(dish: Dish, currRate: number) {
        dish.rating = (dish.rating * dish.ratesCount + currRate) / (dish.ratesCount + 1)
        dish.ratesCount++

        const updatedDish = this.dishesService.getDishWithID(dish._id)
        updatedDish!.ratesCount = dish.ratesCount
        updatedDish!.rating = dish.rating

        // this.filtersService.notifyChanges()
    }
}
