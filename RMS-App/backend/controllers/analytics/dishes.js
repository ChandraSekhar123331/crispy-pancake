const analyticsDishService = require('../../services/analytics/dish');

const topDishByRevenue = function topDishByRevenue(req, res) {
  const numTop = 20;
  return analyticsDishService
    .topDishByRevenue(numTop)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(409).json(error));
};

const worstDishByRevenue = function worstDishByRevenue(req, res) {
  const numTop = 20;
  return analyticsDishService
    .worstDishByRevenue(numTop)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(409).json(error));
};

const topDishBySales = function topDishBySales(req, res) {
  const numTop = 20;
  return analyticsDishService
    .topDishBySales(numTop)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(409).json(error));
};
const worstDishBySales = function worstDishBySales(req, res) {
  const numTop = 20;
  return analyticsDishService
    .worstDishBySales(numTop)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(409).json(error));
};

exports.topDishByRevenue = topDishByRevenue;
exports.worstDishByRevenue = worstDishByRevenue;
exports.topDishBySales = topDishBySales;
exports.worstDishBySales = worstDishBySales;
