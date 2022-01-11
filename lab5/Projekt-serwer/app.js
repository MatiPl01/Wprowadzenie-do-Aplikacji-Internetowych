const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('./db/db-connect')
const bp = require('body-parser')

const dishRouter = require('./routes/dish-routes')
const currenciesRouter = require('./routes/currencies-routes')

const app = express()

// Implementing CORS

// Adding middlewares
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(cors())

// Adding routes
app.use('/v1/dishes', dishRouter)
app.use('/v1/currencies', currenciesRouter)

module.exports = app
