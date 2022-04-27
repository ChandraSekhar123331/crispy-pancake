const express = require('express');
const customerLoginController = require('../controllers/customer/login');
const customerCrudController = require('../controllers/customer/crud');

const router = express.Router();

router.post('/create', customerCrudController.insert); // create is == register
router.post('/update', customerCrudController.update);
router.get('/getAllInfo', customerCrudController.getAllInfo);
router.get('/getOneInfo', customerCrudController.getOneInfo);

router.post('/login', customerLoginController.loginUser);

module.exports = router;
