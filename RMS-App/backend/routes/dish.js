const express = require('express');
const dishCrudController = require('../controllers/dish/crud');

const router = express.Router();

router.post('/create', dishCrudController.insert);
router.post('/delete', dishCrudController.dlete);
router.post('/update', dishCrudController.update);
router.get('/getAllInfo', dishCrudController.getAllInfo);
router.get('/getOneInfo', dishCrudController.getOneInfo);
