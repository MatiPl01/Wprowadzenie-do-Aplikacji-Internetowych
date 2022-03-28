import { Injectable, EventEmitter } from '@angular/core'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService { 
    currencyChanged = new EventEmitter<string>();
    private currenciesJsonPath: string = '../../../assets/json/currencies.json'
    private exchangeRates: Map<string, Map<string, number>> = new Map()
    private symbols: Map<string, string> = new Map()
    currentCurrency: string = 'USD'

    constructor(private http: HttpClient) {
        this.http
            .get(this.currenciesJsonPath)
            .subscribe(this.loadCurrencies.bind(this))
    }

    notifyCurrencyChanged() {
        this.currencyChanged.emit(this.currentCurrency);
    }

    loadCurrencies(data: any) {
        Object.keys(data.symbols).forEach(key => this.symbols.set(key, data.symbols[key]))
        Object.keys(data.exchangeRates).forEach(key1 => {
            const map1 = new Map()
            this.exchangeRates.set(key1, map1)
            Object.keys(data.exchangeRates[key1]).forEach(key2 => {
                map1.set(key2, data.exchangeRates[key1][key2])
                if (!this.exchangeRates.has(key2)) this.exchangeRates.set(key2, new Map())
                this.exchangeRates.get(key2)?.set(key1, 1 / data.exchangeRates[key1][key2])
            })
        })
    }

    exchangeAmount(price: number, initialCurrency: string, targetCurrency: string): number {
        return price * this.getExchangeRatio(initialCurrency, targetCurrency)
    }

    calcAmount(price: number, currency: string): number {
        return this.exchangeAmount(price, currency, this.currentCurrency)
    }

    getExchangeRatio(originalCurrency: string, targetCurrency: string): number {
        if (originalCurrency === targetCurrency) return 1
        return this.exchangeRates.get(originalCurrency)?.get(targetCurrency) || 0
    }

    getCurrentCurrency(): string {
        return this.currentCurrency
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
}
