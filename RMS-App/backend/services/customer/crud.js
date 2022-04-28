const { poolObj } = require('../connectDb');

const insert = function insert(
  userName,
  fullName,
  emailId,
  phoneNumber,
  address,
  password,
) {
  const query = `insert into customer(user_name, full_name, email_id, 
    phone_number, cust_address, cust_password)
    values($1, $2, $3, $4, $5, $6)
    returning *`;

  return poolObj
    .query(query, [userName, fullName, emailId, phoneNumber, address, password])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};

const getOneInfo = function getOneInfo(customerId) {
  const query = `select user_name, full_name, email_id, cust_address
  from customer
  where customer_id = $1`;
  return poolObj
    .query(query, [customerId])
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
  const query = `select user_name, full_name, email_id, cust_address
  from customer
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
const dlete = function dlete() {};

exports.insert = insert;
exports.getOneInfo = getOneInfo;
exports.getAllInfo = getAllInfo;
exports.update = update;
exports.dlete = dlete;
