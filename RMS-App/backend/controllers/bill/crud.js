const freeAttendService = require('../../services/employee/attendant/freeAttendant');
const billCrudService = require('../../services/bill/crud');
const orderItemService = require('../../services/bill/orderItem');

const insertOnlineBill = function insertOnlineBill(req, res) {
  const customerId = req.session.user.id;
  const { role } = req.session.user;
  const { itemList } = req.body;
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
  if (itemList == null) {
    return res.status(403).json({
      message: "itemList can't be null for an order",
      code: -1,
      result: null,
    });
  }
  if (itemList.length === 0) {
    return res.status(403).json({
      message: "itemList can't be null for an order",
      code: -1,
      result: null,
    });
  }
  const orderType = 'online';
  // need to check if role is customer or not.

  return freeAttendService
    .getFreeOnlineAttendant()
    .then((attendantResponse) => {
      if (attendantResponse.result.rowCount === 0) {
        return res.status(403).json({
          message: 'No attendant free. Please reorder later.',
          code: -1,
          result: null,
        });
      }
      const attendantId = attendantResponse.result.rows[0].attendant_id;
      // create a bill
      return billCrudService
        .insert(customerId, orderType)
        .then((billResponse) => {
          const billId = billResponse.result.rows[0].bill_id;
          // assign attendant
          return freeAttendService
            .assignAttendant(billId, attendantId)
            .then(() => {
              // insert items.
              for (let i = 0; i < itemList.length; i += 1) {
                orderItemService
                  .insert(billId, itemList[i].dishId, itemList[i].quantity)
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
                result: billResponse.result.rows[0],
              });
            })
            .catch((error) =>
              res.status(409).json({
                message: error.message,
                code: -1,
                result: null,
              }),
            );
          // assign items.
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

const addItemList = function addItemList(req, res) {
  const { billId, itemList } = req.body;
  if (itemList == null) {
    return res.status(403).json({
      message: "itemList can't be null for an order",
      code: -1,
      result: null,
    });
  }
  if (itemList.length === 0) {
    return res.status(403).json({
      message: "itemList can't be null for an order",
      code: -1,
      result: null,
    });
  }
  if (billId == null) {
    return res.status(403).json({
      message: "billId can't be null",
      code: -1,
      result: null,
    });
  }
  for (let i = 0; i < itemList.length; i += 1) {
    orderItemService
      .insert(billId, itemList[i].dishId, itemList[i].quantity)
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
    result: null,
  });
};

const assignWaiter = function assignWaiter(req, res) {
  const { billId } = req.body;
  return freeAttendService
    .getFreeOfflineAttendant()
    .then((attendantResponse) => {
      if (attendantResponse.result.rowCount === 0) {
        return res.status(403).json({
          message: 'No attendant free. Please reorder later.',
          code: -1,
          result: null,
        });
      }
      const attendantId = attendantResponse.result.rows[0].attendant_id;
      return freeAttendService
        .assignAttendant(billId, attendantId)
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
    })
    .catch((error) =>
      res.status(409).json({
        message: error.message,
        code: -1,
        result: null,
      }),
    );
};

const updateDeliveredStatus = function updateDeliveredStatus(req, res) {
  const { billId } = req.query;
  if (billId == null) {
    return res.status(409).json({
      message: "billId can't be null",
      code: -1,
      result: null,
    });
  }
  return billCrudService
    .markDelivered(billId)
    .then((response) => {
      if (response.result.rowCount === 0) {
        return res.status(409).json({
          message: 'billId not present in the table',
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
// const
// const createBill = function createBill(req, res) {
//   const {customerId, orderType, }
// };
// const getAllInfo = function getAllInfo(req, res) {
//   const { skip, lim } = req.query;
//   if (skip == null || lim == null) {
//     return res.status(409).json({
//       message: "skip, lim can't be null",
//       code: -1,
//       result: null,
//     });
//   }
//   if (skip < 0) {
//     return res.status(409).json({
//       message: 'skip should be non-negative',
//       code: -1,
//       result: null,
//     });
//   }
//   if (lim < 0) {
//     return res.status(409).json({
//       message: 'lim should be non-negative',
//       code: -1,
//       result: null,
//     });
//   }
//   return billCrudService
//     .getAllInfo(skip, lim)
//     .then((response) =>
//       res.status(200).json({
//         message: 'Success',
//         code: 0,
//         result: response.result.rows,
//       }),
//     )
//     .catch((error) =>
//       res.status(409).json({
//         message: error.message,
//         code: -1,
//         result: null,
//       }),
//     );
// };
// const getOneInfo = function getOneInfo(req, res) {
//   const { billId } = req.query;
//   if (billId == null) {
//     return res.status(409).json({
//       message: 'billId should not be null',
//       code: -1,
//       result: null,
//     });
//   }
//   return billCrudService
//     .getOneInfo(billId)
//     .then((response) => {
//       if (response.result.rowCount === 0) {
//         return res.status(409).json({
//           message: 'stockId not found in the Database',
//           code: -1,
//           result: null,
//         });
//       }
//       return res.status(200).json({
//         message: 'Success',
//         code: 0,
//         result: response.result.rows[0],
//       });
//     })
//     .catch((error) =>
//       res.status(409).json({
//         message: error.message,
//         code: -1,
//         result: null,
//       }),
//     );
// };

exports.insertOnlineBill = insertOnlineBill;
exports.addItemList = addItemList;
exports.assignWaiter = assignWaiter;
exports.updateDeliveredStatus = updateDeliveredStatus;
// exports.insertOfflineBill = insertOfflineBill;
// exports.getAllInfo = getAllInfo;
// exports.getOneInfo = getOneInfo;
