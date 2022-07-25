const express = require('express');
const router = express.Router();

const { newOrder, getSingleOrder, getUserOrders, getAllOrders, updateOrder } = require('../controllers/orderController');

const { isAuthenticatedUser, authorizeRole } = require('../middlewares/auth');

router.route('/order/new').post(isAuthenticatedUser, newOrder);

router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, getUserOrders);

router.route('/admin/orders').get(isAuthenticatedUser, authorizeRole('admin'), getAllOrders);
router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRole('admin'), updateOrder);

module.exports = router;