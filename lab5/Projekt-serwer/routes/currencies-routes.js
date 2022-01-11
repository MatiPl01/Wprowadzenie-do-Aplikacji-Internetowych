const express = require('express')
const { getCurrencies } = require('../controllers/currencies-controller')
const router = express.Router()

router
  .route('/')
  .get(getCurrencies)

module.exports = router
