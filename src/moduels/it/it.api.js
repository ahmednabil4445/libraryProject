const app = require('express').Router()
const { uploadSingleImage } = require('../../middleware/fileUpload')
const { protectedRoutes } = require('../auth/auth.service')
const { createBookIT, updateBookIt, deleteBookIt, getDetailsOfBookIt, getSpecificBookIt, getAllBooksIt } = require('./it.service')
app.route('/').post(protectedRoutes, uploadSingleImage('image', 'book'), createBookIT).get(getAllBooksIt)
app.route('/:id').get(getSpecificBookIt).delete(deleteBookIt).put(updateBookIt)
app.route("/getDetailsOfbook/:id").get(getDetailsOfBookIt);

module.exports = app