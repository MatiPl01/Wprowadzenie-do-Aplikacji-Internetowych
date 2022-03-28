import { Component } from '@angular/core';

import { OrderService } from '../services/order.service';
import { DishesFormService } from '../services/dishes-form.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(public orderService: OrderService, private dishesFromService: DishesFormService) { }

  onBtnAddClick() {
    this.dishesFromService.onBtnAddClick()
  }

  onBtnCartClick() {
    this.orderService.onBtnCartClick()
  }
}
