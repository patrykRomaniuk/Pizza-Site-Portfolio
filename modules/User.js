const mongoose = require('mongoose');

let User = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pizzas: [
        {
            pizzaName: {
                type: String,
                required: true
            },
            pizzaPrice: {
                type: String,
                required: true
            },
            pizzaCount: {
                type: String,
                required: true
            },
            priceStart: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = User = mongoose.model('user',User);