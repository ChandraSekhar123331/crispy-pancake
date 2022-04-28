const { poolObj } = require('../connectDb');

const insert = function insert(position, occupancy) {
  const query = `insert into tbl(postion, occupancy) values ($1, $2)
  returning *`;

  return poolObj
    .query(query, [position, occupancy])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};

const update = function update(tableId, position, occupancy) {
  const query = `Update tbl
  set position = $2, occupancy = $3
  where tbl.table_id = $1
  returning *`;

  return poolObj
    .query(query, [tableId, position, occupancy])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};

const getAllInfo = function getAllInfo(skip, lim) {
  const query = `select * from tbl
  limit $1 offset $2`;
  return poolObj
    .query(query, [lim, skip])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};

const getOneInfo = function getOneInfo(tableId) {
  const query = `select * from tbl
  where tbl.table_id = $1`;
  return poolObj
    .query(query, [tableId])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};

// const dlete = function dlete(tableId) {
//   const query = 'delete * from tbl where tbl.table_id = $1 returning *';

//   return poolObj
//     .query(query, [tableId])
//     .then((response) =>
//       Promise.resolve({
//         message: 'Success',
//         code: null,
//         response: response.rows,
//       }),
//     )
//     .catch((error) =>
//       Promise.reject(
//         new Error({
//           message: error.message,
//           code: error.code,
//           response: null,
//         }),
//       ),
//     );
// };

exports.insert = insert;
exports.update = update;
exports.getAllInfo = getAllInfo;
exports.getOneInfo = getOneInfo;
// exports.dlete = dlete;
