const { request } = require('express');
const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');

// Register a new user => api/v1/register
exports.registerUser = catchAsyncError( async(req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'test',
            url: 'testurl'
        }
    })

    const token = user.getJwtToken();

    res.status(201).json({
        status: 'success',
        token
    })
})

// Login a user => api/v1/login
exports.loginUser = catchAsyncError( async(req,res, next) => {
    const { email, password } = req.body;

    // 1. Check if email and password are present
    if(!email || !password) {
        return next(new ErrorHandler('Please provide email and password', 400));
    }

    // 2. Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if(!user) {
        return next(new ErrorHandler('Invalid credentials', 401));
    }

    // 3. Check if password is correct
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid credentials', 401));
    }

    const token = user.getJwtToken();

    res.status(200).json({
        status: 'success',
        token
    })
}) 