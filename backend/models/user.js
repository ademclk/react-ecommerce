const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : [true, 'You must provide your name.'],
        maxLength: [30, 'Name must be less than 30 characters.'],
    },
    email: {
        type: String,
        required : [true, 'You must provide your email.'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email address.']
    },
    password: {
        type: String,
        required : [true, 'You must provide your password.'],
        minLength: [8, 'Password must be at least 8 characters.'],
        maxLength: [32, 'Password must be less than 32 characters.'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})

module.exports = mongoose.model('User', user.Schema);