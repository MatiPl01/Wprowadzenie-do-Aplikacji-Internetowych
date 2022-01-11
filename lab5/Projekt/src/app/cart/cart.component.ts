import { Component } from '@angular/core'
import { PaginationService } from '../services/pagination.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent {
  constructor(public paginationService: PaginationService) {}
}
