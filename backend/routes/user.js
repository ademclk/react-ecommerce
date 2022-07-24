const express = require('express');
const router = express.Router();

const { 
    registerUser, 
    loginUser, 
    resetPassword, 
    changePassword,
    logout, 
    showUserProfile } = require('../controllers/userController');

const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/password/reset').post(resetPassword);
router.route('/password/change/:token').put(changePassword);

router.route('/logout').get(logout)

router.route('/me').get(isAuthenticatedUser, showUserProfile);
module.exports = router;  