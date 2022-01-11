const Currencies = require('../models/currencies.model')

exports.getCurrencies = async (req, res) => {
    try {
        const currencies = await Currencies.findOne()

        res.status(200).json({
            status: 'success',
            data: currencies
        })

    } catch (err) {
        console.error(err)
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}
