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
  const { customerId, tableList, startTime } = req.body;
  console.log(req.body);
  // assuming that the tableList that reaches here is a valid non clashing one.
  if (tableList == null) {
    return res.status(409).json({
      message: "tableList can't be null",
      code: -1,
      result: null,
    });
  }
  // const customerId = req.session.user.id;
  // const { role } = req.session.user;
  if (customerId == null) {
    return res.status(403).json({
      message: 'customerId not defined. Unauthorised access.',
      code: -1,
      result: null,
    });
  }
  // if (role == null) {
  //   return res.status(403).json({
  //     message: 'role not defined. Unauthorised access.',
  //     code: -1,
  //     result: null,
  //   });
  // }
  return billCrudService
    .insert(customerId, 'hotel')
    .then((response) => {
      const billId = response.result.rows[0].bill_id;
      tableService
        .bookTable(billId, tableList.tableId, startTime)
        .then((response) => {
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
    })
    .catch((error) =>
      res.status(409).json({
        message: error.message,
        code: -1,
        result: null,
      }),
    );
};

const getFreeTablesFloor = function getFreeTablesFloor(req, res) {
  let { startTime, floor, occupancy } = req.query;
  if (occupancy === null) {
    return res.status(409).json({
      message: "occupancy can't be null",
      code: -1,
      result: null,
    });
  }
  if (floor === null) {
    return res.status(409).json({
      message: "floor can't be null",
      code: -1,
      result: null,
    });
  }
  if (startTime === 'undefined') {
    startTime = new Date();
  }

  return tableService
    .getFreeTablesFloor(startTime, floor, occupancy)
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

exports.getFreeTables = getFreeTables;
exports.getFreeTablesFloor = getFreeTablesFloor;
exports.bookTable = bookTable;
