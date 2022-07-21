const Product = require('../models/product');

// Create a new product => /api/v1/product/new
exports.createProduct = async (req, res, next) => {

    const product = await Product.create(req.body);
    
    res.status(201).json({
        success: true,
        product
    })
}

// Get all products => /api/v1/products
exports.getProducts = async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        count: products.length,
        message: 'All products fetched from the database successfully.',
        products
    })
}