const ingredCrudService = require('../../services/ingredients/crud');

const insert = function insert(req, res) {
  const { dishId, stockId, quantity } = req.query;
  if (dishId == null) {
    return res.status(409).json({
      message: "dishId can't be null",
      code: -1,
      result: null,
    });
  }
  if (stockId == null) {
    return res.status(409).json({
      message: "stockId can't be null",
      code: -1,
      result: null,
    });
  }
  if (quantity == null) {
    return res.status(409).json({
      message: "quantity can't be null",
      code: -1,
      result: null,
    });
  }

  return ingredCrudService
    .insert(dishId, stockId, quantity)
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
  // returns the items used in dishes from
  // skip to skip + lim-1. Each dish will
  // possibly have multiple rows. So it is
  // the duty of frontend to interpret it.
  // The same semantics described in getOneInfo for
  // number of rows per dishId hold here also.
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
  return ingredCrudService
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
  // Returns the details of items used in this dish(dishID).
  // So possibly can have 0 or = 1 or >1 rows.
  // 0 rows means dishId not present in the database.
  // 1 row means either 1 ingredient or no ingredient but just
  // because of left-outer-join it looks so.
  // > 1 row means usual.
  const { dishId } = req.query;
  if (dishId == null) {
    return res.status(409).json({
      message: "dishId can't be null",
      code: -1,
      result: null,
    });
  }
  return ingredCrudService
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
        result: response.result.rows,
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
