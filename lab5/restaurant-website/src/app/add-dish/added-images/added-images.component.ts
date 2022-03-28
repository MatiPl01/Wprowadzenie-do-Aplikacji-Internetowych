import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AddedImage } from 'src/app/shared/models/added-image.model';

@Component({
  selector: 'app-added-images',
  templateUrl: './added-images.component.html'
})
export class AddedImagesComponent {
  @Output() imagesChangedEvent = new EventEmitter<AddedImage[]>()
  @Input() images: AddedImage[] = []

  onRemoveClick(idx: number): void {
    this.images.splice(idx, 1)
    this.imagesChangedEvent.emit(this.images)
  }
}
