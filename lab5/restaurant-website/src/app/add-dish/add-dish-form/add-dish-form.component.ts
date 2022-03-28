import { Component, HostListener, Output, ViewChild, EventEmitter, Input } from '@angular/core'
import { NgForm } from '@angular/forms'
import { DishesService } from '../../services/dishes.service'
import { CurrencyService } from '../../services/currency.service'
import { Dish } from '../../shared/models/dish.model'
import { AddedImage } from 'src/app/shared/models/added-image.model'
import { ImageEntry } from 'src/app/shared/models/image-entry.model'

@Component({
  selector: 'app-add-dish-form',
  templateUrl: './add-dish-form.component.html'
})
export class AddDishFormComponent {
  @Output() imagesChangedEvent = new EventEmitter<AddedImage[]>()
  @ViewChild('f') mainForm!: NgForm;
  @ViewChild('g') imageForm!: NgForm;
  @Input() images: AddedImage[] = []
  isImageValid: boolean = true
  isWidthValid: boolean = true
  isGroupValid: boolean = true

  constructor(public currencyService: CurrencyService, private dishesService: DishesService) {}

  @HostListener('reset')
  onReset() {
    this.imageForm.resetForm()
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.images.length) {
      // Create a dish data object
      const dish = this.createDishObject(form)
      // Clear form
      this.images = []
      this.imagesChangedEvent.emit(this.images)
      form.reset()
      // Send data to the service
      this.dishesService.addDish(dish)
    }
  }

  onImageAdd(form: NgForm): void {
    const path = form.value.image?.trim()
    const width = +form.value.width
    const group = +form.value.group
    this.isImageValid = path !== ''
    // @ts-ignore
    this.isWidthValid = width >= 20 && width <= 4000
    this.isGroupValid = form.value.group.length > 0 && (group >= 0 && group <= 99)
    
    if (this.isImageValid && this.isWidthValid && this.isGroupValid) {
      this.images.push({ path, width, group })
      this.imageForm.resetForm()
      this.images.sort((a: AddedImage, b: AddedImage) => {
        return 10 * Math.sign(a.group - b.group) + Math.sign(a.width - b.width)
      })
      this.imagesChangedEvent.emit(this.images)
    }
  }

  private createDishObject(form: NgForm): Dish {
    // @ts-ignore
    return {
      name: form.value.name,
      cuisine: form.value?.cuisine?.toLowerCase() || 'międzynarodowa',
      type: form.value?.type?.toLowerCase() || 'pozostałe',
      category: form.value?.category || 'pozostałe',
      ingredients: form.value.ingredients?.trim().split(',').map((s: string) => s.trim()) || [],
      stock: form.value.stock,
      currency: this.currencyService.currentCurrency,
      unitPrice: +form.value.price.replace(',', '.'),
      rating: 0,
      ratesCount: 0,
      description: form.value.description.split('\n').map((p: string) => p.trim()),
      images: {
        coverIdx: 0,
        gallery: this.getImagesData()
      },
      reviews: []
    }
  }

  private getImagesData(): ImageEntry[] {
    if (!this.images.length) return []
    let currEntry = { breakpoints: [this.images[0].width], paths: [this.images[0].path] }
    if (this.images.length === 1) return [currEntry]
    const emptyEntry = { breakpoints: [], paths: [] }
    const entries: ImageEntry[] = []

    for (let i = 1; i < this.images.length; i++) {
      const currImage = this.images[i]
      if (currImage.group !== this.images[i - 1].group) {
        entries.push(currEntry)
        currEntry = JSON.parse(JSON.stringify(emptyEntry))
      }
      currEntry.breakpoints.push(currImage.width)
      currEntry.paths.push(currImage.path)
    }
    entries.push(currEntry)

    return entries
  }
}
