const { request } = require('express');
const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

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

    sendToken(user, 200, res);
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

    sendToken(user, 200, res);
}) 

// Logout a user => api/v1/logout
exports.logout = catchAsyncError( async(req, res, next) => {
    res.cookie('token', null ,{
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'You are logged out successfully.'
    })
})