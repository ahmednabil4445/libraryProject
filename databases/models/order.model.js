const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    cartItems: [
        {
            book: { type: mongoose.Types.ObjectId, ref: 'book' },
            quantity:  Number,
            price: Number
        }
    ],
    totalOrderPrice: Number,
    shippingAddress:{
        city:String,
        street:String,
        phone:String
    },
    paymentMethod:{
        type:String,
        enum:['cash' , 'card'],
        default:"card"
       
    },
    isPaid:{
        type:Boolean,
        default:false
       
    },
    paidAt:Date,
    isDeliverd:{
        type:Boolean,
        default:false
       
    },
    deliveredAt:Date,
    notes:String
}, { timestamps: true })

module.exports = mongoose.model('order', orderSchema)