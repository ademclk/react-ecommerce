const express = require('express');
const router = express.Router();

const { getProducts, 
        createProduct, 
        getSingleProduct, 
        updateProduct, 
        deleteProduct, 
        createProductReview,
        getProductReviews } = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRole } = require('../middlewares/auth');        

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(isAuthenticatedUser ,authorizeRole('admin'), createProduct);

router.route('/admin/product/:id')
    .put(isAuthenticatedUser ,authorizeRole('admin'), updateProduct)
    .delete(isAuthenticatedUser ,authorizeRole('admin'), deleteProduct);

router.route('/review').put(isAuthenticatedUser , createProductReview);
router.route('/reviews').get(isAuthenticatedUser , getProductReviews);

module.exports = router;