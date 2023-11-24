const mongoose = require('mongoose')

const cartUsedBookSchema = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    cartItems: [
        {
            usedBook: { type: mongoose.Types.ObjectId, ref: 'usedBook' },
            quantity: { type: Number, default: 1 },
            price: Number
        }
    ],
    totalPrice: Number,
}, { timestamps: true })

module.exports = mongoose.model('cartUsedBookS', cartUsedBookSchema)