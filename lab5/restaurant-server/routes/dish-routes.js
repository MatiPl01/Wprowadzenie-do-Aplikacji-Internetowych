const express = require('express')
const { getAllDishes, addDish, getDish, updateDish, deleteDish } = require('../controllers/dish-controller')
const router = express.Router()

router
  .route('/')
  .get(getAllDishes)
  .post(addDish)

router
  .route('/:id/')
  .get(getDish)
  .patch(updateDish)
  .delete(deleteDish)

module.exports = router
