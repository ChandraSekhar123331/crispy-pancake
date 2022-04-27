const express = require('express');
const managerCrudController = require('../controllers/employee/manager/crud');

const router = express.Router();

router.post('/create', managerCrudController.insert);
router.post('/delete', managerCrudController.dlete);
router.post('/update', managerCrudController.update);
router.get('/getAllInfo', managerCrudController.getAllInfo);
router.get('/getOneInfo', managerCrudController.getOneInfo);
