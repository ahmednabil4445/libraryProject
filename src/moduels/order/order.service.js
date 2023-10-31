const cartModel = require('../../../databases/models/cart.model')
const orderModel = require('../../../databases/models/order.model')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')
const bookModel = require('../../../databases/models/book.model')
const userModel = require('../../../databases/models/user.model')
const stripe = require('stripe')('sk_test_51O4m4tB9UbIOtgpkiaZMdlkrCV0t3Jp5AHjToxwGMc6FnmZflQUnvYHnrhEObZP2hWQ5JO5KXhJ4LnTuP2liPMvR00g64ASGXL');
// ********************************************************************
module.exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    let orders = await orderModel.find({})
    res.status(200).json({ message: ' Success', orders })
})

// *********************** Card *******************************************************

module.exports.createCheckOutSession = catchAsyncError(async (req, res, next) => {
    let cart = await cartModel.findById(req.params.id)
    const totalOrderPrice = cart.totalPrice;
    let session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "egp",
                    unit_amount: totalOrderPrice * 100,
                    product_data: {
                        name: req.user.name
                    }
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: "https://hatem011.github.io/e-commerce/#/login",
        cancel_url: "https://hatem011.github.io/e-commerce/#/register",
        customer_email: req.user.email,
        client_reference_id: req.params.id,
        metadata: req.body.shippingAddress
    })
    res.status(200).json({ message: ' Success', session })

})


module.exports.createOnlineOrder = catchAsyncError((request, response) => {
    const sig = request.headers['stripe-signature'].toString();
    let event;
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, 'whsec_EqqMCXtaOgaRsqp5NGeXi9DmMz6kaAuq');
    } catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }
    if (event.type == 'checkout.session.completed') {
        // const checkoutSessionCompleted = event.data.object;
        card(event.data.object)
    } else {
        console.log(`Unhandled event type ${event.type}`);
    }
    response.send();
}
)


async function card(e , res) {
    let cart = await cartModel.findById(e.client_reference_id)
    if (!cart) return next(new AppError('Cart Not Found ', 404))
    let user = await userModel.findOne({ email: e.customer_email })

    const order = new orderModel({
        user: user._id,
        cartItems: cart.cartItems,
        totalOrderPrice: e.amount_total / 100,
        shippingAddress: e.metadata.shippingAddress,
        paymentMethod: "card",
        isPaid: true,
        paidAt: Date.now(),

    })
    await order.save()
    if (order) {
        let options = cart.cartItems.map(item => ({
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -item.quantity, sold: item.quantity } }
            }
        }))
        await bookModel.bulkWrite(options)
        await cartModel.findOneAndDelete({ user: user._id })
        return res.status(201).json({ message: ' Success', order })
    }
    return next(new AppError('Order Not Found', 404))

}