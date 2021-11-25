var mongoose = require('mongoose');

var ProductOrdersSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    user: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('ProductOrders', ProductOrdersSchema);