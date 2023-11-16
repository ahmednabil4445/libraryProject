const app = require('express').Router()
const { uploadSingleImage } = require('../../middleware/fileUpload')
const { protectedRoutes } = require('../auth/auth.service')
const { updateBookAccounting, createBookAccounting, deleteBookAccounting, getSpecificBookAccounting, getDetailsOfBookAccounting, getAllBooksAccounting } = require('./accounting.service')
app.route('/').post(protectedRoutes, uploadSingleImage('image', 'book'), createBookAccounting).get(getAllBooksAccounting)
app.route('/:id').get(getSpecificBookAccounting).delete(deleteBookAccounting).put(updateBookAccounting)
app.route("/getDetailsOfbook/:id").get(getDetailsOfBookAccounting);

module.exports = app