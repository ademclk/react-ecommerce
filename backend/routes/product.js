const express = require('express');
const router = express.Router();

const { getProducts, createProduct, getSingleProduct, updateProduct } = require('../controllers/productController')

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(createProduct);

router.route('/admin/product/:id').put(updateProduct);

module.exports = router;