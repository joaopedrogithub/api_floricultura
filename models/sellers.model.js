const mongoose = require('mongoose')

const sellerSchema = mongoose.Schema({
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
    salesvalues: {
        type: Number,
        required: true

    }
    
})

module.exports = mongoose.model('seller', sellerSchema)