const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    cartItems: [
        {
            book: { type: mongoose.Types.ObjectId, ref: 'book' },
            quantity: { type: Number, default: 1 },
            price: Number
        }
    ],
    totalPrice: Number,
}, { timestamps: true })

module.exports = mongoose.model('cart', cartSchema)