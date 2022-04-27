// const { poolObj } = require('../connectDb');

// const insertEmployee = function insertEmployee(
//   userName,
//   empName,
//   address,
//   emailId,
//   phoneNum,
//   password,
//   role,
//   salary,
// ) {
//   const query = `insert into employee(userName, empName,
//     address, emailId, phoneNum, password, role, salary)
//     values($1, $2, $3, $4, $5, $6, $7)
//     returning *`;
//   return poolObj
//     .query(query, [
//       userName,
//       empName,
//       address,
//       emailId,
//       phoneNum,
//       password,
//       role,
//       salary,
//     ])
//     .then((response) =>
//       Promise.resolve({
//         message: 'Success',
//         response: response.rows,
//         code: null,
//       }),
//     )
//     .catch((error) =>
//       Promise.reject(
//         new Error({
//           message: error.message,
//           response: null,
//           code: error.code,
//         }),
//       ),
//     );
// };

// const u

// exports.insert = insertEmployee;
