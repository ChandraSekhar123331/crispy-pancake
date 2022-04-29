const miscDishService = require('../../services/analytics/dish');

const topItemsByType = function topItemsByType(req, res) {
  const numTop = 3;
  return miscDishService
    .topItemsByType(numTop)
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

const bestWeekDayByOrders = function bestWeekDayByOrders(req, res) {
  return miscDishService
    .bestWeekDayByOrders()
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

const monthlySales = function monthlySales(req, res) {
  return miscDishService
    .monthlySales()
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

exports.topItemsByType = topItemsByType;
exports.bestWeekDayByOrders = bestWeekDayByOrders;
exports.monthlySales = monthlySales;
