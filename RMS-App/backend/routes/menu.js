const express = require('express');
const menuController = require('../controllers/menu');

const router = express.Router();

router.get('/basic', menuController.basicMenu);

module.exports = router;
