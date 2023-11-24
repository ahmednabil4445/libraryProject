const express = require('express')
const { dbConnection } = require('./databases/dbConnection')
require('dotenv').config()
var morgan = require('morgan')
const AppError = require('./src/utils/AppError')
const app = express()
const port = 3000
app.use(express.json())
app.use(express.static('uploads'))
app.use(morgan('dev'))
const cors = require('cors');
app.use(cors())
// *******************************************************************


app.use('/api/v1/users', require('./src/moduels/user/user.api'))
app.use('/api/v1/auth', require('./src/moduels/auth/auth.api'))
app.use('/api/v1/wishList', require('./src/moduels/wishlist/wishlist.api'))
app.use('/api/v1/books', require('./src/moduels/book/book.api'))
app.use('/api/v1/itBook', require('./src/moduels/it/it.api'))
app.use('/api/v1/accountingBook', require('./src/moduels/accounting/accounting.api'))
app.use('/api/v1/marketingBook', require('./src/moduels/marketing/marketing.api'))
app.use('/api/v1/carts', require('./src/moduels/cart/cart.api'))
app.use('/api/v1/cartUsedBooks', require('./src/moduels/cartUsedBook/cartUsedBook.api'))
app.use('/api/v1/orders', require('./src/moduels/order/order.api'))
app.use('/api/v1/usedBooks', require('./src/moduels/usedBooks/usedBook.api'))


app.all('*', (req, res, next) => {
    // res.json({message:`Can't find this route : ${req.originalUrl}` })
    next(new AppError(`Can't find this route : ${req.originalUrl} on server`, 404))
})
// *******************************************************************

// ******************** global error handling middleware ************
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({ Error: err.message, statusCode })
})
dbConnection()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection', err);
})