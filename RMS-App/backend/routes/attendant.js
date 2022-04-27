const express = require('express');
const attendantCrudController = require('../controllers/employee/attendant/crud');

const router = express.Router();

router.post('/create', attendantCrudController.insert);
// router.post('/delete', attendantCrudController.dlete);
router.post('/update', attendantCrudController.update);
router.get('/getAllInfo', attendantCrudController.getAllInfo);
router.get('/getOneInfo', attendantCrudController.getOneInfo);

module.exports = router;
