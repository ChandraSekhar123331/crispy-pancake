const express = require('express');
const analyticsDishController = require('../controllers/analytics/dishes');

const router = express.Router();
router.get('/top-dishes-byRevenue', analyticsDishController.topDishByRevenue);
router.get('/top-dishes-bySales', analyticsDishController.topDishBySales);
router.get(
  '/worst-dishes-byRevenue',
  analyticsDishController.worstDishByRevenue,
);
router.get('/worst-dishes-bySales', analyticsDishController.worstDishBySales);
