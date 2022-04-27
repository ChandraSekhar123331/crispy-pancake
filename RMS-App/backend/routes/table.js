const express = require('express');

const router = express.Router();

const crudController = require('../controllers/table/crud');
const tableController = require('../controllers/table/table');

router.post('/insert', crudController.insert);
router.post('/delete', crudController.dlete);
router.post('/update', crudController.update);
router.get('/getAllInfo', crudController.getAllInfo);
router.get('/getOneInfo', crudController.getOneInfo);
router.get('/getFreeTables', tableController.getFreeTables);
router.post('/bookTable', tableController.bookTable);

module.exports = router;
