var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    numitems: {
        type: Number,
        required: true
    },
    products: [{
        product: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    modepayment: {
        type: String,
        required: true
    },
    modedelivery: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    pointsused: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    timeordered: {
        type: Date,
        required: false
    },
    timecompleted: {
        type: Date,
        required: false
    },
    timecancelled: {
        type: Date,
        required: false
    },
    timeconfirmed: {
        type: Date,
        required: false
    }
});

module.exports = mongoose.model('Order', OrderSchema);