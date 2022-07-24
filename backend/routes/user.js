const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logout, resetPassword } = require('../controllers/userController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/reset').post(resetPassword);

router.route('/logout').get(logout)

module.exports = router;