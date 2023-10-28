const app = require('express').Router()
const { signup, signin, sendCode, forgetPassword } = require('./auth.service')
app.route('/signup').post(signup)
app.route('/signin').post(signin)
app.patch('/sendCode',sendCode)
app.patch('/forgetPassword',forgetPassword)
module.exports = app