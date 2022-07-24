const User = require('../models/user');

const jwt = require('jsonwebtoken');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {

    const { token } = req.cookies;

    if(!token) {
        return next(new ErrorHandler('You are not logged in', 401));
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
});

// Adding roles to the user
exports.authorizeRole = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ErrorHandler('You are not authorized to perform this action', 403));
        }
        next();
    }
}