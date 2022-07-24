const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logout, resetPassword, changePassword } = require('../controllers/userController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/password/reset').post(resetPassword);
router.route('/password/change/:token').put(changePassword);

router.route('/logout').get(logout)

module.exports = router; 