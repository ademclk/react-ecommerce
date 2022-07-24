const express = require('express');
const router = express.Router();

const { 
    registerUser, 
    loginUser, 
    resetPassword, 
    changePassword,
    logout, 
    showUserProfile, 
    updatePassword, 
    editUserProfile, 
    getAllUsers, 
    getSingleUser, 
    updateUser, 
    deleteUser } = require('../controllers/userController');

const { isAuthenticatedUser, authorizeRole } = require('../middlewares/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/password/reset').post(resetPassword);
router.route('/password/change/:token').put(changePassword);

router.route('/logout').get(logout)

router.route('/me').get(isAuthenticatedUser, showUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/edit').put(isAuthenticatedUser, editUserProfile);

router.route('/admin/users').get(isAuthenticatedUser, authorizeRole('admin'), getAllUsers);
router.route('/admin/users/:id')
            .get(isAuthenticatedUser, authorizeRole('admin'), getSingleUser)
            .put(isAuthenticatedUser, authorizeRole('admin'), updateUser)
            .delete(isAuthenticatedUser, authorizeRole('admin'), deleteUser);

module.exports = router;  