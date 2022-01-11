import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gallery-slider',
  templateUrl: './gallery-slider.component.html'
})
export class GallerySliderComponent implements OnInit {
  @Output() currentImageChanged = new EventEmitter<number>()
  @Input() imagesCount!: number
  @Input() currentIdx!: number
  indexes: number[] = []

  ngOnInit(): void {
    this.indexes = this.getPhotosIndexes()
  }

  photoChanged(idx: number) {
    this.currentIdx = idx
    this.currentImageChanged.emit(idx)
  }

  getPhotosIndexes(): number[] {
    return new Array(this.imagesCount).fill(0).map((_, i) => i)
  }
}
