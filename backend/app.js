const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

const errorMiddleware = require('./middlewares/errors');
app.use(express.json());
app.use(cookieParser());

// Import routes
const products = require('./routes/product');
const users = require('./routes/user');

app.use('/api/v1', products);
app.use('/api/v1', users);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;