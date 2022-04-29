const tableService = require('../../services/table/table');
const billCrudService = require('../../services/bill/crud');

const getFreeTables = function getFreeTables(req, res) {
  const { startTime } = req.query;
  if (startTime == null) {
    return res.status(409).json({
      message: "startTime can't be null",
      code: -1,
      result: null,
    });
  }

  return tableService
    .getFreeTables(startTime)
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

const bookTable = function bookTable(req, res) {
  const { tableList, startTime } = req.body;
  // assuming that the tableList that reaches here is a valid non clashing one.
  if (tableList == null) {
    return res.status(409).json({
      message: "tableList can't be null",
      code: -1,
      result: null,
    });
  }
  const customerId = req.session.user.id;
  const { role } = req.session.user;
  if (customerId == null) {
    return res.status(403).json({
      message: 'customerId not defined. Unauthorised access.',
      code: -1,
      result: null,
    });
  }
  if (role == null) {
    return res.status(403).json({
      message: 'role not defined. Unauthorised access.',
      code: -1,
      result: null,
    });
  }
  return billCrudService
    .insert(customerId, 'hotel')
    .then((response) => {
      const billId = response.result.rows[0].bill_id;
      for (let i = 0; i < tableList.length; i += 1) {
        tableService
          .bookTable(billId, tableList[i].tableId, startTime)
          .catch((error) =>
            res.status(409).json({
              message: error.message,
              code: -1,
              result: null,
            }),
          );
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

exports.getFreeTables = getFreeTables;
exports.bookTable = bookTable;
