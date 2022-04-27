const express = require('express');
const logoutController = require('../controllers/auth/logout');
const fetchUserController = require('../controllers/auth/fetchUser');

const router = express.Router();
router.post('/logout', logoutController.logoutUser);
router.post('/fetchUser', fetchUserController.fetchUser);

module.exports = router;
