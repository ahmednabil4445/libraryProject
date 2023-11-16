const marketingModel = require('../../../databases/models/marketing.model')
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

module.exports.createBookMarketing = catchAsyncError(async (req, res) => {
    cloudinary.v2.uploader.upload(req.file.path, async (error, result) => {
        req.body.image = result.secure_url
        let book = new marketingModel(req.body)
        await book.save();
        res.status(200).json({ message: 'Success', book })
    });
})


module.exports.getAllBooksMarketing = catchAsyncError(async (req, res) => {
    let Books = await marketingModel.find({})
    res.json({ message: 'this is All Books',Books })
})

module.exports.getSpecificBookMarketing = catchAsyncError(async (req, res) => {
    const {id} = req.params
    let Book = await marketingModel.findById(id)
    res.json({ message: 'Success',Book })
})

module.exports.updateBookMarketing = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let book = await marketingModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!book) {
        return next(new AppError(`Book Not Found`, 404))
    }
    res.json({ message: 'Updated Book', book })
})

module.exports.deleteBookMarketing = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let Book = await marketingModel.findByIdAndDelete(id);
    if (!Book) {
        return next(new AppError(`Book Not Found`, 404))
    }
    res.json({ message: 'Deleted Book', Book })
})


exports.getDetailsOfBookMarketing = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const book = await marketingModel.findById(id, { name: 1, description: 1,_id:0, price: 1, image: 1 , department : 1 ,price:1});
    if (!book) {
      return next(new AppError("book not found", 400));
    }
    res.status(200).json(book);
  });