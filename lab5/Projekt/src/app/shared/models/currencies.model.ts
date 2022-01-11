export interface Currencies {
    symbols: { currency: string, symbol: string }[],
    mainCurrency: string
    exchangeRates: { from: string, to: string, ratio: number }[]
}
