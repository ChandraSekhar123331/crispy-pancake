const { poolObj } = require('../connectDb');

const getUser = function getUser(emailId) {
  const query = `select customer_id, user_name, full_name, email_id,
  cust_address, cust_password
  from customer
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

exports.getUser = getUser;
