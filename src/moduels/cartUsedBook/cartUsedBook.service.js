const cartUsedBookModel = require('../../../databases/models/cartUsedBook.model')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')
const usedBookModel = require('../../../databases/models/usedBook.model')

// **********************************************************************

function calcTotalPrice(cart) {
    let totalPrice = 0
    cart.cartItems.forEach(element => {
        totalPrice += element.quantity * element.price;
    });
    cart.totalPrice = totalPrice
}
module.exports.addUsedBookToCart = catchAsyncError(async (req, res, next) => {
    let usedBook = await usedBookModel.findById(req.params.usedBook)
    if (!usedBook) return next(new AppError('Used Book not found', 401))
    req.body.price = usedBook.price
    let isCartExist = await cartUsedBookModel.findOne({ user: req.user._id })
    if (!isCartExist) {
        let result = new cartUsedBookModel({
            user: req.user._id,
            cartItems: [req.body]
        })
        calcTotalPrice(result)
        await result.save();
        return res.status(200).json({ message: 'Added Cart Success', result })
    }
    let item = isCartExist.cartItems.find((elm) => elm.usedBook == req.params.usedBook)
    if (item) {
        item.quantity += 1
    } else {
        isCartExist.cartItems.push(req.body)
    }

    calcTotalPrice(isCartExist)
    await isCartExist.save();
    res.status(200).json({ message: 'Success', cart: isCartExist })

})

module.exports.removeUsedBookFromCart = catchAsyncError(async (req, res, next) => {
    let Result = await cartUsedBookModel.findOneAndUpdate({ user: req.user._id }, { $pull: { cartItems: { _id: req.params.id } } }, { new: true });
    if (!Result) {
        return next(new AppError(`Item Not Found`, 404))
    }
    calcTotalPrice(Result)
    await Result.save();
    res.json({ message: 'Removed Item Success', cart: Result })
})

// module.exports.updateQuantity = catchAsyncError(async (req, res, next) => {
//     let book = await bookModel.findById(req.params.id)
//     if (!book) return next(new AppError('book not found', 401))

//     let isCartExist = await cartModel.findOne({ user: req.user._id })

//     let item = isCartExist.cartItems.find((elm) => elm.book == req.params.id)
//     if (item) {
//         item.quantity = req.body.quantity
//     }
//     calcTotalPrice(isCartExist)

//     await isCartExist.save();
//     res.status(200).json({ message: 'Updated Success', cart: isCartExist })
// })



// module.exports.getLoggedCartUser = catchAsyncError(async (req, res, next) => {
//     let cartItems = await cartModel.findOne({ user: req.user._id }).populate('cartItems.book')
//     calcTotalPrice(cartItems)
//     await cartItems.save();
//     res.status(200).json({ message: 'Success', cart: cartItems })

// })

