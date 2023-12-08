const app = require('express').Router()
const { uploadSingleImage } = require('../../middleware/fileUpload')
const { protectedRoutes, allowedTo } = require('../auth/auth.service')
const { createBook, getAllBooks, updateBook, deleteBook, getSpecificBook, getDetailsOfBook } = require('./book.service')
app.route('/').post(protectedRoutes,allowedTo('admin'), uploadSingleImage('image', 'book'), createBook).get(getAllBooks)
app.route('/:id').get(getSpecificBook).delete(deleteBook).put(updateBook)
app.route("/getDetailsOfbook/:id").get(getDetailsOfBook);

module.exports = app
