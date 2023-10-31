const { protectedRoutes, allowedTo } = require('../auth/auth.service')
const { createCheckOutSession } = require('./order.service')

const app = require('express').Router()


app.route('/checkOut/:id').post(protectedRoutes, allowedTo('user'), createCheckOutSession)



module.exports = app