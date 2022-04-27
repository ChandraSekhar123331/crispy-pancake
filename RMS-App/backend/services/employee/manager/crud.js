// const { poolObj } = require('../connectDb');

// const insertManager = function insertManager(empId, skill) {
//   const query = `insert into Manager(manager_id, skill)
//   values($1, $2)
//   returning *`;

//   return poolObj
//     .query(query, [empId, skill])
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

// exports.insertManager = insertManager;
