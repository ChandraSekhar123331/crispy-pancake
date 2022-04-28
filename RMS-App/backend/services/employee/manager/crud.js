const { poolObj } = require('../../connectDb');

const insert = function insert(empId, skill) {
  const query = `insert into manager(manager_id, skill)
    values($1, $2)
    returning *`;

  return poolObj
    .query(query, [empId, skill])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};

const getOneInfo = function getOneInfo(empId) {
  const query = `select emp_id, emp_name, email_id, phone_number, 
  emp_address, emp_role, salary, skill
  from employee, manager
  where employee.emp_id = manager.manager_id
  and employee.emp_id = $1`;
  return poolObj
    .query(query, [empId])
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
  const query = `select emp_id, emp_name, email_id, phone_number, 
  emp_address, emp_role, salary, skill
  from employee, manager
  where employee.emp_id = manager.manager_id
  limit $1
  offset $2;`;
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
// const dlete = function dlete() {};

exports.insert = insert;
exports.getOneInfo = getOneInfo;
exports.getAllInfo = getAllInfo;
exports.update = update;
// exports.dlete = dlete;
