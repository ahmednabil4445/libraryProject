const app = require('express').Router()
const { uploadSingleImage } = require('../../middleware/fileUpload')
const { protectedRoutes, allowedTo } = require('../auth/auth.service')
const { createUsedBook, getAllUsedBooks } = require('./usedBooks.service')
app.route('/').post(protectedRoutes,allowedTo('user'), uploadSingleImage('image', 'book'), createUsedBook).get(getAllUsedBooks)


module.exports = app
