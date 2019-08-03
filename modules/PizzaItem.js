const mongoose = require('mongoose');

let PizzaItem = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Int16Array,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    count: {
        type: Int16Array,
        required: true
    }
});

module.exports = PizzaItem = mongoose.model('pizzaItem',PizzaItem);