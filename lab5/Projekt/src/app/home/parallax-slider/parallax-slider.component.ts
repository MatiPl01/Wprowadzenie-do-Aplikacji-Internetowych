import { Component, AfterViewInit, Input, HostListener } from '@angular/core'

@Component({
  selector: 'app-parallax-slider',
  templateUrl: './parallax-slider.component.html'
})
export class ParallaxSliderComponent implements AfterViewInit {
  @Input() ease: number = .05

  sliderFigures!: HTMLElement[]
  slider!: HTMLElement
  container!: HTMLElement

  observer: IntersectionObserver
  isIntersecting: boolean = false
  animationFinished: boolean = true

  scrollHeight!: number
  sliderWidth!: number
  figureWidth!: number

  current: number = 0
  target: number = 0

  constructor() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        this.isIntersecting = entry.isIntersecting
        if (entry.isIntersecting) {
          this.target = this.current = this.getTranslate()
        }
      })
    })
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.sliderFigures = [...document.querySelectorAll('.slider__figure')]
    // @ts-ignore
    this.slider = document.querySelector('.slider__list')
    // @ts-ignore
    this.container = document.querySelector('.slider-container')
    this.init()
    this.observer.observe(this.container)
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    if (this.isIntersecting && this.animationFinished) requestAnimationFrame(this.animate.bind(this))
  }

  @HostListener("window:resize", ["$event"])
  onWindowResize() {
    this.init()
  }

  private init() {
    this.scrollHeight = this.container.getBoundingClientRect().height - window.innerHeight
    this.sliderWidth = this.slider.getBoundingClientRect().width
    this.figureWidth = this.sliderWidth / this.sliderFigures.length
  }

  private lerp(start: number, end: number, t: number): number {
    return start * (1 - t) + end * t
  }

  private animate() {
    this.animationFinished = false
    this.target = this.getTranslate();
    this.current = +this.lerp(this.current, this.target, this.ease).toFixed(2)
    this.slider.style.left = `${-this.current}px`
    this.animateFigures.call(this)
    if (this.isIntersecting && Math.abs(this.current - this.target) > .5) requestAnimationFrame(this.animate.bind(this))
    else this.animationFinished = true
  }

  private getTranslate(): number {
    const parentEl = this.container.parentElement
    // @ts-ignore
    const scrollRatio = -parentEl.getBoundingClientRect().top / this.scrollHeight
    return scrollRatio * (this.sliderWidth - window.innerWidth)
  }

  private animateFigures() {
    const ratio = this.current / this.figureWidth

    this.sliderFigures.forEach((figure, idx) => {
      const intersectionRatio = ratio - (idx * .7)
      // @ts-ignore
      figure.querySelector('img').style.transform = `translateX(${intersectionRatio * 70}px)`
    })
  }
}
