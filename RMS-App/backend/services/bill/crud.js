const { poolObj } = require('../connectDb');

const insert = function insert(customerId, orderType) {
  const query = `insert into bill(customer_id, order_type, bill_time)
  values($1, $2, localtimestamp)`;

  return poolObj
    .query(query, [customerId, orderType])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};
const markDelivered = function markDelivered(billId) {
  const query = `
  update attended_by
  set delivered=true 
  where bill_id=$1
  returning *
   `;

  return poolObj
    .query(query, [billId])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};
// const getOneInfo = function getOneInfo() {
//   const query = ``;

//   return poolObj
//     .query(query, [])
//     .then((response) =>
//       Promise.resolve({
//         message: 'Success',
//         code: 0,
//         result: response,
//       }),
//     )
//     .catch((error) => Promise.reject(new Error(error.message)));
// };

// const getAllInfo = function getAllInfo(skip, lim) {
//   const query = ``;

//   return poolObj
//     .query(query, [])
//     .then((response) =>
//       Promise.resolve({
//         message: 'Success',
//         code: 0,
//         result: response,
//       }),
//     )
//     .catch((error) => Promise.reject(new Error(error.message)));
// };

exports.insert = insert;
exports.markDelivered = markDelivered;
// exports.getOneInfo = getOneInfo;
// exports.getAllInfo = getAllInfo;
