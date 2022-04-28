const { poolObj } = require('../connectDb');

const getUser = function getUser(emailId) {
  const query = `select emp_id, user_name, emp_name, email_id,
  emp_address, emp_password, emp_role
  from employee
  where email_id = $1`;

  return poolObj
    .query(query, [emailId])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};

const getOneInfo = function getOneInfo(employeeId) {
  const query = `select user_name, emp_name, email_id, emp_address
  from employee
  where emp_id = $1`;
  return poolObj
    .query(query, [employeeId])
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
  const query = `select user_name, emp_name, email_id, emp_address
  from employee
  limit $1
  offset $2`;
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

const update = function update() {};

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

// exports.insert = insertEmployee;

exports.getUser = getUser;
exports.getOneInfo = getOneInfo;
exports.getAllInfo = getAllInfo;
exports.update = update;
