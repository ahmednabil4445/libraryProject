const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')
const userModel = require('../../../databases/models/user.model')

module.exports.addBookToWishList = catchAsyncError(async (req, res, next) => {
    const { id } = req.body
    let Result = await userModel.findByIdAndUpdate(req.user._id, { $addToSet: { wishList: id } }, { new: true }).populate('wishList');
    if (!Result) {
        return next(new AppError(`book Not Found`, 404))
    }
    res.json({ message: 'Success', Result: Result.wishList })
})

module.exports.removeBookFromWishList = catchAsyncError(async (req, res, next) => {
   const { id } = req.params
    let Result = await userModel.findByIdAndUpdate(req.user._id, { $pull: { wishList: id } }, { new: true }).populate('wishList');
    if (!Result) {
        return next(new AppError(`book Not Found`, 404))
    }
    res.json({ message: 'Success book Removed From WishList', Result: Result.wishList })
})

module.exports.getAllUserBookWishList = catchAsyncError(async (req, res, next) => {
    let Result = await userModel.findOne({ _id: req.user._id }).populate('wishList');
    if (!Result) {
        return next(new AppError(`book Not Found`, 404))
    }
    res.json({ message: 'This All User book WishList', Result: Result.wishList })
})

