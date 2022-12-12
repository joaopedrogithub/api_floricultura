const mongoose = require('mongoose')

const plantsSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    name_plants: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('plants', plantsSchema)