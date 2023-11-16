const mongoose = require('mongoose')

const itSchema = mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'book name is unique'],
        trim: true,
        required: [true, 'book name is required'],
        minLength: [2, 'too short book name']
    },
    price: {
        type: Number, 
        required: [true, 'book price required'],
        min: 0,

    },
    ratingAvg: {
        type: Number, 
        min: [1, 'rating average must be greater than 1'],
        max: [5, 'rating average must be less than 5'],
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'book description required'],
        minLength: [5, 'too short book description'],
        maxLength: [300, 'too long book description']
    },
    quantity: {
        type: Number, 
        default: 0,
    },
    sold: {
        type: Number, 
        min:0,
        default: 0,
    },
    image:String,
    department:String
}, { timestamps: true})



module.exports = mongoose.model('it', itSchema)