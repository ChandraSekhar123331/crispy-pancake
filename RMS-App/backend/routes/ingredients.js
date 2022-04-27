const express = require('express');
const ingredCrudController = require('../controllers/ingredients/crud');

const router = express.Router();

router.post('/create', ingredCrudController.insert);
router.post('/delete', ingredCrudController.dlete);
router.post('/update', ingredCrudController.update);
router.get('/getAllInfo', ingredCrudController.getAllInfo);
router.get('/getOneInfo', ingredCrudController.getOneInfo);

module.exports = router;
