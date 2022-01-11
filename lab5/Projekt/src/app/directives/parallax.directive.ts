import { Directive, Input, ElementRef, HostListener } from '@angular/core'

@Directive({
    selector: '[parallax]'
})
export class ParallaxDirective {
    @Input('ratio') parallaxRatio: number = 0
    @Input() ease: number = .05

    targetEl: HTMLHtmlElement
    observer: IntersectionObserver
    isIntersecting: boolean = false
    animationFinished: boolean = true

    current = 0
    target = 0

    constructor(private elRef: ElementRef) {
        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                this.isIntersecting = entry.isIntersecting
                if (entry.isIntersecting) this.target = this.current = this.getScrollFromCenter()
            })
        })
        this.targetEl = elRef.nativeElement
        this.observer.observe(this.targetEl);
    }

    @HostListener("window:scroll", ["$event"])
    onWindowScroll() {
        if (this.isIntersecting && this.animationFinished) requestAnimationFrame(this.animate.bind(this))
    }

    private lerp(start: number, end: number, t: number): number {
        return start * (1 - t) + end * t
    }

    private animate() {
        this.animationFinished = false
        this.target = this.getScrollFromCenter();
        this.current = +this.lerp(this.current, this.target, this.ease).toFixed(2)
        this.targetEl.style.top = `${-this.current}px`
        if (this.isIntersecting && Math.abs(this.current - this.target) > .5) requestAnimationFrame(this.animate.bind(this))
        else this.animationFinished = true
    }

    private getScrollFromCenter(): number {
        const parentEl = this.targetEl.parentElement
        // @ts-ignore
        const centerY = parentEl.getBoundingClientRect().top + parentEl.clientHeight / 2 - document.body.getBoundingClientRect().top - window.innerHeight / 2;
        return (window.scrollY - centerY) * this.parallaxRatio
    }
}
