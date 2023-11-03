const app = require('express').Router()
const { protectedRoutes, allowedTo } = require('../auth/auth.service')
const {  addBookToWishList, removeBookFromWishList, getAllUserBookWishList } = require('./wishlist.service')
app.route('/:id').post(protectedRoutes,addBookToWishList)
app.route('/:id').delete(protectedRoutes,removeBookFromWishList)
app.route('/').get(protectedRoutes, allowedTo('user'),getAllUserBookWishList)
module.exports = app
