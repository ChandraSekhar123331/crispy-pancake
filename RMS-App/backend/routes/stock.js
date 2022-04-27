const express = require('express');
const stockCrudController = require('../controllers/stock/crud');

const router = express.Router();

router.post('/create', stockCrudController.insert);
router.post('/delete', stockCrudController.dlete);
router.post('/update', stockCrudController.update);
router.get('/getAllInfo', stockCrudController.getAllInfo);
router.get('/getOneInfo', stockCrudController.getOneInfo);
