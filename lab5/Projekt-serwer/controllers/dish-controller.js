const { ObjectId } = require("mongodb")
const Dish = require("../models/dish.model")

exports.getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.find()

        res.status(200).json({
            status: 'success',
            data: dishes
        })

    } catch (err) {
        console.error(err)
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.addDish = async (req, res) => {
    try {
        req.body._id = ObjectId() // Generate object id
        const newDish = await Dish.create(req.body)

        res.status(201).json({
            status: 'success',
            data: newDish
        })

    } catch (err) {
        console.error(err)
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

exports.getDish = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id)

    res.status(200).json({
        status: 'success',
        data: dish
    })

    } catch (err) {
        console.error(err)
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

exports.updateDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        status: 'success',
        data: dish
    })

    } catch (err) {
        console.error(err)
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

exports.deleteDish = async (req, res) => {
    try {
       await Dish.findByIdAndDelete(req.params.id)

       res.status(204).json({
            status: 'success',
            data: null
        })

    } catch (err) {
        console.error(err)
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}
