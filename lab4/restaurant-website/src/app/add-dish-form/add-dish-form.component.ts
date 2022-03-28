import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Dish } from 'src/shared/models/dish.model';
import { DishesFormService } from '../services/dishes-form.service';
import { CurrencyService } from '../services/currency.service';
import { DishesService } from '../services/dishes.service';

@Component({
  selector: 'app-add-dish-form',
  templateUrl: './add-dish-form.component.html',
  styleUrls: ['./add-dish-form.component.scss']
})
export class AddDishFormComponent implements OnInit {
  isOpen: boolean = false

  constructor(private dishesFormService: DishesFormService, public currencyService: CurrencyService, private dishesService: DishesService) { }

  ngOnInit(): void {
    this.dishesFormService.openForm.subscribe(() => this.isOpen = true)
  }

  onClose() {
    this.isOpen = false
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const dish = this.createDishObject(form)
      this.dishesService.addDish(dish)
      form.reset()
    }
  }

  createDishObject(form: NgForm): Dish {
    const id = this.dishesService.maxDishID + 1
    const imagesPaths = form.value.images.split(',').map((path: string) => path.trim())
    const newDish: Dish = {
        id,
        name: form.value.name,
        cuisine: form.value?.cuisine || 'międzynarodowa',
        type: form.value?.type || 'pozostałe',
        category: form.value?.category || 'pozostałe',
        ingredients: form.value.ingredients?.trim().split(',').map((s: string) => s.trim()) || [],
        stock: form.value.stock,
        currency: this.currencyService.currentCurrency,
        unitPrice: +form.value.price.replace(',', '.'),
        rating: 0,
        ratesCount: 0,
        description: form.value.description,
        images: {
          breakpoints: [1920],
          cover: [imagesPaths[0]],
          gallery: [imagesPaths.slice(1)]
        }
    }
    return newDish;
  }
}
