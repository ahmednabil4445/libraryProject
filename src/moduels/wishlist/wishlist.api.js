const app = require('express').Router()
const { protectedRoutes, allowedTo } = require('../auth/auth.service')
const { removeFromWishList, getAllUserWishList, addPlantToWishList, removePlantFromWishList, getAllUserPlantWishList } = require('./wishlist.service')
app.route('/').post(protectedRoutes,addPlantToWishList)
app.route('/').delete(protectedRoutes,removePlantFromWishList)
app.route('/').get(protectedRoutes, allowedTo('user'),getAllUserPlantWishList)
module.exports = app
