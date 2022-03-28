import { Injectable, EventEmitter } from '@angular/core'
import { Dish } from 'src/app/shared/models/dish.model'
import { Currencies } from '../shared/models/currencies.model';
import { WebRequestService } from './web-request.service';

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {
    currencyChangedEvent = new EventEmitter<string>()
    private exchangeRates: Map<string, Map<string, number>> = new Map()
    private symbols: Map<string, string> = new Map()
    private referenceCurrency: string = 'USD'
    currentCurrency: string = 'USD'
    areCurrenciesLoaded: boolean = false

    constructor(private webRequestService: WebRequestService) {
        this.webRequestService
            .get('currencies')
            .subscribe((res: any) => this.loadCurrencies(res.data))
    }

    getReferenceCurrency(): string {
        return this.referenceCurrency
    }

    getCurrencySymbol(currency: string): string {
        return this.symbols.get(currency) || ''
    }

    getCurrentCurrencySymbol(): string {
        return this.getCurrencySymbol(this.currentCurrency)
    }

    getAvailableCurrencies(): string[] {
        return [...this.exchangeRates.keys()]
    }

    calcDishCurrentPrice(dish: Dish): number {
        return this.exchangeAmount(dish.unitPrice, dish.currency, this.currentCurrency)
    }

    calcDishReferencePrice(dish: Dish): number {
        return this.exchangeAmount(dish.unitPrice, dish.currency, this.referenceCurrency)
    }

    exchangeAmount(amount: number, initialCurrency: string, targetCurrency: string): number {
        return amount * this.getExchangeRatio(initialCurrency, targetCurrency)
    }

    fromCurrentToReference(amount: number): number {
        return this.exchangeAmount(amount, this.currentCurrency, this.referenceCurrency)
    }

    fromReferenceToCurrent(amount: number): number {
        return this.exchangeAmount(amount, this.referenceCurrency, this.currentCurrency)
    }

    notifyCurrencyChanged(): void {
        this.currencyChangedEvent.emit(this.currentCurrency)
    }

    private loadCurrencies(data: Currencies): void {
        this.referenceCurrency = this.currentCurrency = data.mainCurrency

        data.symbols.forEach(({currency, symbol}) => {
            this.symbols.set(currency, symbol)
        })
        
        const rates = this.exchangeRates
        data.exchangeRates.forEach(({from, to, ratio}) => {
            if (!rates.has(from)) rates.set(from, new Map())
            if (!rates.has(to)) rates.set(to, new Map())
            // @ts-ignore
            rates.get(from).set(to, ratio)
            // @ts-ignore
            rates.get(to).set(from, 1 / ratio)
        })

        this.areCurrenciesLoaded = true
    }

    private getExchangeRatio(originalCurrency: string, targetCurrency: string): number {
        if (originalCurrency === targetCurrency) return 1
        return this.exchangeRates.get(originalCurrency)?.get(targetCurrency) || 0
    }
}
