const express = require('express');
const customerLoginController = require('../controllers/customer/login');
const customerRegisterController = require('../controllers/customer/register');
const customerCrudController = require('../controllers/customer/crud');

const router = express.Router();

router.post('/create', customerCrudController.insert);
router.post('/update', customerCrudController.update);
router.get('/getAllInfo', customerCrudController.getAllInfo);
router.get('/getOneInfo', customerCrudController.getOneInfo);

router.post('/login', customerLoginController.loginUser);
router.post('/register', customerRegisterController.registerUser);

module.exports = router;
