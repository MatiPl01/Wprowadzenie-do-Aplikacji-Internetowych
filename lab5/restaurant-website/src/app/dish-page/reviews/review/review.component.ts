import { Component, Input } from '@angular/core';
import { Review } from 'src/app/shared/models/review.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html'
})
export class ReviewComponent {
  @Input() review!: Review
  private dateOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' ,
  }

  getDateString(): string {
    // @ts-ignore
    return new Date(this.review.date).toLocaleDateString('pl-PL', this.dateOptions)
  }
}
