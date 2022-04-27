const express = require('express');
const registerController = require('../controllers/auth/register');
const loginController = require('../controllers/auth/login');
const logoutController = require('../controllers/auth/logout');
const fetchUserController = require('../controllers/auth/fetchUser');

const router = express.Router();
router.post('/register', registerController.registerUser);
router.post('/login', loginController.loginUser);
router.post('/logout', logoutController.logoutUser);
router.post('/fetch-user', fetchUserController.fetchUser);

module.exports = router;
