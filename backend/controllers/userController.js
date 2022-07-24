const { request } = require('express');
const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

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

// Reset password => api/v1/password/reset
exports.resetPassword = catchAsyncError( async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if(!user) {
        return next(new ErrorHandler('No user found with this email', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave : false });

    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/change/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. 
                    Reset your password: \n\n ${resetUrl} \n\n
                    If you did not request this, please ignore this email and your password will remain unchanged.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'You have requested for password recovery (valid for 10 minutes)',
            message
        }); 

        res.status(200).json({
            status: 'success',
            message: `Token sent to email: ${user.email}`
        });
    }
    catch(err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave : false });

        return next(new ErrorHandler(error.message, 500));
}
})

// Change password => api/v1/password/change/:token
exports.changePassword = catchAsyncError( async(req, res, next) => {

    // Hashing URL token to make sure that it is same as the one in the database
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    
    const user = await User.findOne({
        hashedToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    
    if(!user){
        return next(new ErrorHandler('Invalid or expired token', 400));
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Passwords do not match', 400));
    }

    // Set new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

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