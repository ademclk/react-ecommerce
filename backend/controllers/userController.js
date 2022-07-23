const { request } = require('express');
const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const cathAsyncError = require('../middlewares/catchAsyncErrors');

// Register a new user => api/v1/register
exports.registerUser = cathAsyncError( async(req, res, next) => {
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

    res.status(201).json({
        status: 'success',
        user
    })
})