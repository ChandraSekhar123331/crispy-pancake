const stockCrudService = require('../../services/stock/crud');

const insert = function insert(req, res) {
  const { stockName, quantityLeft, minReqd, pricePerUnit } = req.query;
  if (stockName == null) {
    return res.status(409).json({
      message: "stockName can't be null",
      code: -1,
      result: null,
    });
  }
  if (quantityLeft == null) {
    return res.status(409).json({
      message: "quantityLeft can't be null",
      code: -1,
      result: null,
    });
  }
  if (minReqd == null) {
    return res.status(409).json({
      message: "minReqd can't be null",
      code: -1,
      result: null,
    });
  }
  if (pricePerUnit == null) {
    return res.status(409).json({
      message: "pricePerUnit can't be null",
      code: -1,
      result: null,
    });
  }

  return stockCrudService
    .insert(stockName, quantityLeft, minReqd, pricePerUnit)
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
  return stockCrudService
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
  const { stockId } = req.query;
  if (stockId == null) {
    return res.status(409).json({
      message: "stockId can't be null",
      code: -1,
      result: null,
    });
  }
  return stockCrudService
    .getOneInfo(stockId)
    .then((response) => {
      if (response.result.rowCount === 0) {
        return res.status(409).json({
          message: 'stockId not found in the Database',
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
