const dishCrudService = require('../../services/dish/crud');

const insert = function insert(req, res) {
  const { dishName, isVeg, cuisine, itemType, profitPercent } = req.query;
  if (dishName == null) {
    return res.status(409).json({
      message: "dishName can't be null",
      code: -1,
      result: null,
    });
  }
  if (isVeg == null) {
    return res.status(409).json({
      message: "isVeg atrribute can't be null. Should be either true or false",
      code: -1,
      result: null,
    });
  }
  if (cuisine == null) {
    return res.status(409).json({
      message: "cuisine can't be null",
      code: -1,
      result: null,
    });
  }
  if (itemType == null) {
    return res.status(409).json({
      message: "itemType can't be null",
      code: -1,
      result: null,
    });
  }
  if (profitPercent == null) {
    return res.status(409).json({
      message: 'profitPercent',
      code: -1,
      result: null,
    });
  }

  return dishCrudService
    .insert(dishName, isVeg, cuisine, itemType, profitPercent)
    .then((response) =>
      res.status(200).json({
        message: 'Success',
        code: 0,
        result: response.result.rows[0],
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
const getAllInfo = function getAllInfo(req, res) {
  const { skip, lim } = req.query;
  if (skip == null || lim == null) {
    return res.status(409).json({
      message: "skip, lim can't be null",
      code: -1,
      result: null,
    });
  }
  if (skip < 0) {
    return res.status(409).json({
      message: 'skip should be non-negative',
      code: -1,
      result: null,
    });
  }
  if (lim < 0) {
    return res.status(409).json({
      message: 'lim should be non-negative',
      code: -1,
      result: null,
    });
  }
  return dishCrudService
    .getAllInfo(skip, lim)
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
const getOneInfo = function getOneInfo(req, res) {
  const { dishId } = req.query;
  if (dishId == null) {
    return res.status(409).json({
      message: "dishId can't be null",
      code: -1,
      result: null,
    });
  }
  return dishCrudService
    .getOneInfo(dishId)
    .then((response) => {
      if (response.result.rowCount === 0) {
        return res.status(409).json({
          message: 'dishId not found in the Database',
          code: -1,
          result: null,
        });
      }
      return res.status(200).json({
        message: 'Success',
        code: 0,
        result: response.result.rows[0],
      });
    })
    .catch((error) =>
      res.status(409).json({
        message: error.message,
        code: -1,
        result: null,
      }),
    );
};
const dlete = function dlete(req, res) {
  res.status(409).json({
    message: 'Not yet implemented',
    code: -1,
    result: null,
  });
};
const update = function update(req, res) {
  res.status(409).json({
    message: 'Not yet implemented',
    code: -1,
    result: null,
  });
};

exports.insert = insert;
exports.dlete = dlete;
exports.update = update;
exports.getAllInfo = getAllInfo;
exports.getOneInfo = getOneInfo;
