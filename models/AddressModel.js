var mongoose = require('mongoose');

var AddressSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phonenum: {
        type: Number,
        required: true
    },
    postalcode: {
        type: Number,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    barangay: {
        type: String,
        required: true
    },
    addressline: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Address', AddressSchema);