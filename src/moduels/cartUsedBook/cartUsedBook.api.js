const { protectedRoutes, allowedTo } = require('../auth/auth.service')
const { addUsedBookToCart, removeUsedBookFromCart } = require('./cartUsedBook.service')

const app = require('express').Router()

app.route('/:usedBook').post(protectedRoutes, allowedTo('user'), addUsedBookToCart)
// app.route('/applyCoupon').post(protectedRoutes, allowedTo('user'), applyCoupon)
// // app.route('/').post(protectedRoutes, allowedTo('user'), addProductToCart).get(getAllCoupons)
app.route('/:id').delete(protectedRoutes,removeUsedBookFromCart)
// app.route('/:id').patch(protectedRoutes,updateQuantity)
// app.route('/').get(protectedRoutes,getLoggedCartUser)


module.exports = app