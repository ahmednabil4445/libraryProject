const app = require('express').Router()
const { uploadSingleImage } = require('../../middleware/fileUpload')
const { protectedRoutes } = require('../auth/auth.service')
const { createBook, getAllBooks, updateBook, deleteBook, getSpecificBook } = require('./book.service')
app.route('/').post(protectedRoutes, uploadSingleImage('image', 'book'), createBook).get(getAllBooks)
app.route('/:id').get(getSpecificBook).delete(deleteBook).put(updateBook)

module.exports = app