const express = require('express');
const empGenericController = require('../controllers/employee/generic');

const router = express.Router();

router.post('/login', empGenericController.login);
router.post('/update', empGenericController.update);
// router.post('/dlete', empGenericController.dlete);
router.post('getOneInfo', empGenericController.getOneInfo);
router.post('getAllInfo', empGenericController.getAllInfo);

module.exports = router;
