const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'user name is required'],
        minLength: [2, 'too short user name']
    },
    code: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        unique: [true, 'E-mail must be unique'],
        required: [true, 'E-mail required'],
        minLength: 1
    },
    password: {
        type: String,
        required: true,
        minLength: [5, 'MinLength 5 Characters']
    },
    passwordChangedAt: Date,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user"
    },
    wishList: [{ type: mongoose.SchemaTypes.ObjectId , ref:"plant"} ]

}, { timestamps: true })
// **************************************Hash Password **************************
userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 7)
})
userSchema.pre('findOneAndUpdate', function () {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 7)
})
userSchema.pre('updateOne', function () {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 7)
})
//*******************************************************************************
module.exports = mongoose.model('user', userSchema)