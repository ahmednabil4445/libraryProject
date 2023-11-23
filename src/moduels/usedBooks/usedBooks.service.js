const usedBookModel = require('../../../databases/models/usedBook.model')
const slugify = require('slugify')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')
const ApiFeatuers = require('../../utils/ApiFeatuers')
const cloudinary = require('cloudinary')

// **********************************************
cloudinary.v2.config({
    cloud_name: 'dofg9wmp0',
    api_key: '663141422279326',
    api_secret: 'R5M35Mx_R9MbiRp2yP_XSuSa3_Y',
    secure: true,
});
// **********************************************

module.exports.createUsedBook = catchAsyncError(async (req, res) => {
    cloudinary.v2.uploader.upload(req.file.path, async (error, result) => {
        req.body.image = result.secure_url
        let usedBook = new usedBookModel(req.body)
        await usedBook.save();
        res.status(200).json({ message: 'Success', usedBook })
    });
})


module.exports.getAllUsedBooks = catchAsyncError(async (req, res) => {
    let usedBooks = await usedBookModel.find({})
    res.json({ message: 'this is All Books',usedBooks })
})
