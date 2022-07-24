const express = require('express');
const router = express.Router();

const { getProducts, 
        createProduct, 
        getSingleProduct, 
        updateProduct, 
        deleteProduct } = require('../controllers/productController')

const { isAuthenticatedUser } = require('../middlewares/auth');        

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(isAuthenticatedUser, createProduct);

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, updateProduct)
    .delete(isAuthenticatedUser, deleteProduct);

module.exports = router;