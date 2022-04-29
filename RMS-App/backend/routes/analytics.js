const express = require('express');
const analyticsDishController = require('../controllers/analytics/dish');
const analyticsMiscController = require('../controllers/analytics/misc');

const router = express.Router();
router.get('/top-dishes-byRevenue', analyticsDishController.topDishByRevenue);
router.get('/top-dishes-bySales', analyticsDishController.topDishBySales);
router.get(
  '/worst-dishes-byRevenue',
  analyticsDishController.worstDishByRevenue,
);
router.get('/worst-dishes-bySales', analyticsDishController.worstDishBySales);
router.get('/top-items-by-type', analyticsMiscController.topItemsByType);
router.get(
  '/best-week-day-by-orders',
  analyticsMiscController.bestWeekDayByOrders,
);
router.get('/monthly-sales', analyticsMiscController.monthlySales);

module.exports = router;
