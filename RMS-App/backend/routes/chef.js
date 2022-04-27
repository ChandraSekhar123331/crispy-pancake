const express = require('express');
const chefCrudController = require('../controllers/employee/chef/crud');

const router = express.Router();

router.post('/create', chefCrudController.insert);
router.post('/delete', chefCrudController.dlete);
router.post('/update', chefCrudController.update);
router.get('/getAllInfo', chefCrudController.getAllInfo);
router.get('/getOneInfo', chefCrudController.getOneInfo);
