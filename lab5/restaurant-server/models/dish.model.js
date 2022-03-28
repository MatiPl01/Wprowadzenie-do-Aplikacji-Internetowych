const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const dishSchema = new mongoose.Schema({
    _id: {
        type: ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        default: 'międzynarodowa'
    },
    type: {
        type: String,
        default: 'pozostałe'
    },
    category: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    ratesCount: {
        type: Number,
        default: 0
    },
    description: {
        type: [String],
        required: true
    },
    images: {
        coverIdx: {
            type: Number,
            default: 0
        },
        gallery: [{
            breakpoints: {
                type: [Number],
                required: true
            },
            paths: {
                type: [String],
                required: true
            }
        }]
    },
    reviews: [{
        username: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        body: {
            type: [String],
            required: true
        },
        date: {
            type: String,
            default: ''
        },
        rating: {
            type: Number,
            required: true
        }
    }]
})

const Dish = mongoose.model('Dish', dishSchema)

module.exports = Dish
