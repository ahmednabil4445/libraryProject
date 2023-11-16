const app = require('express').Router()
const { uploadSingleImage } = require('../../middleware/fileUpload')
const { protectedRoutes } = require('../auth/auth.service')
const { createBookMarketing, updateBookMarketing, deleteBookMarketing, getDetailsOfBookMarketing, getSpecificBookMarketing, getAllBooksMarketing } = require('./marketing.service')
app.route('/').post(protectedRoutes, uploadSingleImage('image', 'book'), createBookMarketing).get(getAllBooksMarketing)
app.route('/:id').get(getSpecificBookMarketing).delete(deleteBookMarketing).put(updateBookMarketing)
app.route("/getDetailsOfbook/:id").get(getDetailsOfBookMarketing);

module.exports = app