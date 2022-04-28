const express = require('express');
const billCrudController = require('../controllers/bill/crud');

const router = express.Router();

router.post('/onlineBill', billCrudController.insertOnlineBill);
// router.get('/getAllinfo', billCrudController.getAllInfo);
// router.get('/getOneinfo', billCrudController.getOneInfo);

// There is really no need to update or delete a bill.
// Changing a bill is illegal :)
// router.post('/delete', (req, res) => res.status(404).send('Work in progress'));
// router.post('/update', (req, res) => res.status(404).send('Work in progress'));

module.exports = router;
