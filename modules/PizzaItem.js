const mongoose = require('mongoose');

let PizzaItem = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    count: {
        type: String,
        required: true
    }
});

module.exports = PizzaItem = mongoose.model('pizzaItem',PizzaItem);