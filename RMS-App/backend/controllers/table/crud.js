const tableCrudService = require('../../services/table/crud');

const insert = function insert(req, res) {
  const { occupancy, position } = req.query;

  if (occupancy == null) {
    return res.status(409).json({
      message: "occupancy can't be null",
      code: -1,
      result: null,
    });
  }
  if (position == null) {
    return res.status(409).json({
      message: "position can't be null",
      code: -1,
      result: null,
    });
  }
  if (occupancy <= 0) {
    return res.status(409).json({
      message: 'occupancy should be positive',
      code: -1,
      result: null,
    });
  }
  return tableCrudService
    .insert(position, occupancy)
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

const update = function update(req, res) {
  const { tableId, occupancy, position } = req.query;

  if (tableId == null) {
    return res.status(409).json({
      message: "tableId can't be null",
      code: -1,
      result: null,
    });
  }
  if (occupancy == null) {
    return res.status(409).json({
      message: "occupancy can't be null",
      code: -1,
      result: null,
    });
  }
  if (position == null) {
    return res.status(409).json({
      message: "position can't be null",
      code: -1,
      result: null,
    });
  }
  if (occupancy <= 0) {
    return res.status(409).json({
      message: 'occupancy should be positive',
      code: -1,
      result: null,
    });
  }
  return tableCrudService
    .update(tableId, position, occupancy)
    .then((response) => {
      if (response.result.rowCount === 0) {
        return res.status(409).json({
          message: 'tableId not found in the Database. Unable to update.',
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
  return tableCrudService
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
  const { tableId } = req.query;
  if (tableId == null) {
    return res.status(409).json({
      message: "tableId can't be null",
      code: -1,
      result: null,
    });
  }
  return tableCrudService
    .getOneInfo(tableId)
    .then((response) => {
      if (response.result.rowCount === 0) {
        return res.status(409).json({
          message: 'tableId not found in the Database',
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

exports.insert = insert;
exports.update = update;
exports.getAllInfo = getAllInfo;
exports.getOneInfo = getOneInfo;
