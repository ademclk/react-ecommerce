const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500; // 500 is the default status code (internal server error)

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.errMessage,
            stack: err.stack
        })
    }

    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = { ...err }

        error.message = err.message

        // Wrong mongoose Object ID error
        if (err.name === 'CastError') {
            const message = `Resource not found. Invalid ${err.path}`;
            error = new ErrorHandler(message, 400)
        }

        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }
}