import { Injectable, EventEmitter } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class DishesFormService {
    openForm = new EventEmitter<void>()

    onBtnAddClick() {
        this.openForm.emit()
    }
}
