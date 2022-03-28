const mongoose = require('mongoose')

const currenciesSchema = new mongoose.Schema({
    symbols: [{
        currency: {
            type: String,
            required: true
        },
        symbol: {
            type: String,
            required: true
        },
    }],
    mainCurrency: {
        type: String,
        required: true
    },
    exchangeRates: [{
        from: {
            type: String,
            required: true
        },
        to: {
            type: String,
            required: true
        },
        ratio: {
            type: Number,
            required: true
        }
    }]
})

const Currencies = mongoose.model('Currencies', currenciesSchema)

module.exports = Currencies
