const mongoose = require('mongoose');

let Pizza = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    count: {
        type: String,
        required: true
    }
});

module.exports = Pizza = mongoose.model('pizzaItem',Pizza);