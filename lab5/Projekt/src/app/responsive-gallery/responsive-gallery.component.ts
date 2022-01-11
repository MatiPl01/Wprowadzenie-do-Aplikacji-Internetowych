import { Component, AfterViewInit, Input, ElementRef, HostListener } from '@angular/core';
import { ImageEntry } from '../shared/models/image-entry.model';

@Component({
  selector: 'app-responsive-gallery',
  templateUrl: './responsive-gallery.component.html'
})
export class ResponsiveGalleryComponent implements AfterViewInit {
  @Input() images!: ImageEntry[]
  @Input() sizes!: string
  @Input() alts!: string[]
  
  galleryEl!: HTMLElement
  itemsEls!: HTMLElement[]
  itemsListEl!: HTMLElement

  isDragging: boolean = false
  startPosition: number = 0
  currTranslate: number = 0
  prevTranslate: number = 0
  animationID: number = 0
  currentIdx: number = 0

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.galleryEl = this.elRef.nativeElement.querySelector('.gallery')
    this.itemsEls = Array.from(this.galleryEl.querySelectorAll('.gallery__images-item'))
    // @ts-ignore
    this.itemsListEl = this.galleryEl.querySelector('.gallery__images-list')
    this.addEventListeners()
  }

  setCurrentImage(newIdx: number): void {
    this.currentIdx = newIdx
    this.setPositionByIdx()
  }

  @HostListener("window:resize", ["$event"])
  onWindowResize() {
    this.setPositionByIdx()
  }

  private addEventListeners(): void {
    this.galleryEl.addEventListener('contextmenu', e => {
      e.preventDefault()
      e.stopPropagation()
    })

    this.itemsEls.forEach((itemEl, idx) => {
      const imageEl = itemEl.querySelector('img')
      imageEl?.addEventListener('dragstart', e => e.preventDefault())

      // Touch events
      itemEl.addEventListener('touchstart', this.touchStart(idx).bind(this))
      itemEl.addEventListener('touchend', this.touchEnd.bind(this))
      itemEl.addEventListener('touchmove', this.touchMove.bind(this))

      // Mouse events
      itemEl.addEventListener('mousedown', this.touchStart(idx).bind(this))
      itemEl.addEventListener('mouseup', this.touchEnd.bind(this))
      itemEl.addEventListener('mouseleave', this.touchEnd.bind(this))
      itemEl.addEventListener('mousemove', this.touchMove.bind(this))
    })
  }

  private touchStart(idx: number) {
    return (e: any) => {
      this.currentIdx = idx
      this.startPosition = this.getTouchX(e)
      this.isDragging = true
      this.animationID = requestAnimationFrame(this.animation.bind(this))
    }
  }

  private touchEnd() {
    this.isDragging = false
    cancelAnimationFrame(this.animationID)

    const movedBy = this.currTranslate - this.prevTranslate

    if (movedBy < -100 && this.currentIdx < this.itemsEls.length - 1) this.currentIdx += 1
    if (movedBy > 100 && this.currentIdx > 0) this.currentIdx -= 1

    this.setPositionByIdx()
  }

  private touchMove(e: any) {
    if (this.isDragging) {
      const currPosition = this.getTouchX(e)
      this.currTranslate = this.prevTranslate + currPosition - this.startPosition
    }
  }

  private getTouchX(e: any): number {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX
  }

  private animation() {
    this.setTranslate()
    if (this.isDragging) requestAnimationFrame(this.animation.bind(this))
  }

  private setTranslate() {
    this.itemsListEl.style.transform = `translateX(${this.currTranslate}px)`
  }

  private setPositionByIdx() {
    this.currTranslate = this.currentIdx * -this.galleryEl.getBoundingClientRect().width
    this.prevTranslate = this.currTranslate
    this.setTranslate()
  }
}
