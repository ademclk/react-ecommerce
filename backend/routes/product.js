const express = require('express');
const router = express.Router();

const { getProducts, createProduct, getSingleProduct } = require('../controllers/productController')

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/product/new').post(createProduct);

module.exports = router;