import { Component } from '@angular/core'
import { CurrencyService } from '../services/currency.service'

@Component({
  selector: 'app-choose-currency',
  templateUrl: './choose-currency.component.html'
})
export class ChooseCurrencyComponent {

  constructor(public currencyService: CurrencyService) { }

  onCurrencyChange() {
    this.currencyService.notifyCurrencyChanged()
  }
}
