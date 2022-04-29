const analyticsDishService = require('../../services/analytics/dish');

const topDishByRevenue = function topDishByRevenue(req, res) {
  const numTop = 10;
  return analyticsDishService
    .topDishByRevenue(numTop)
    .then((response) =>
      res.status(200).json({
        message: 'Success',
        code: 0,
        result: response.result.rows,
      }),
    )
    .catch((error) =>
      res.status(409).json({
        message: error.message,
        code: -1,
        result: null,
      }),
    );
};

const worstDishByRevenue = function worstDishByRevenue(req, res) {
  const numTop = 10;
  return analyticsDishService
    .worstDishByRevenue(numTop)
    .then((response) =>
      res.status(200).json({
        message: 'Success',
        code: 0,
        result: response.result.rows,
      }),
    )
    .catch((error) =>
      res.status(409).json({
        message: error.message,
        code: -1,
        result: null,
      }),
    );
};

const topDishBySales = function topDishBySales(req, res) {
  const numTop = 10;
  return analyticsDishService
    .topDishBySales(numTop)
    .then((response) =>
      res.status(200).json({
        message: 'Success',
        code: 0,
        result: response.result.rows,
      }),
    )
    .catch((error) =>
      res.status(409).json({
        message: error.message,
        code: -1,
        result: null,
      }),
    );
};
const worstDishBySales = function worstDishBySales(req, res) {
  const numTop = 10;
  return analyticsDishService
    .worstDishBySales(numTop)
    .then((response) =>
      res.status(200).json({
        message: 'Success',
        code: 0,
        result: response.result.rows,
      }),
    )
    .catch((error) =>
      res.status(409).json({
        message: error.message,
        code: -1,
        result: null,
      }),
    );
};

exports.topDishByRevenue = topDishByRevenue;
exports.worstDishByRevenue = worstDishByRevenue;
exports.topDishBySales = topDishBySales;
exports.worstDishBySales = worstDishBySales;
