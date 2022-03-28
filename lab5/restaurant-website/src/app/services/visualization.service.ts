import { Injectable, EventEmitter } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class VisualizationService {
    headerVisibilityChangedEvent = new EventEmitter<boolean>();

    notifyHeaderVisible(isVisible: boolean): void {
        this.headerVisibilityChangedEvent.emit(isVisible)
    }

    scrollY(offset: number, isSmooth: boolean = true): void {
        window.scrollTo({
            top: offset,
            // @ts-ignore
            behavior: isSmooth ? 'smooth' : 'instant'
        })
    }
}
