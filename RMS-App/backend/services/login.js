const { poolObj } = require('./connectDb');

const loginUser = function loginUser(email) {
  const query = `SELECT id, firstname, surname, email, password FROM 
  users WHERE email = $1`;
  return poolObj
    .query(query, [email])
    .then((response) => {
      const result = {
        success: false,
        message: '',
        result: null,
      };
      if (response.rowCount === 0) {
        result.success = false;
        result.message = 'User with this email doesnot exist';
        result.result = null;
        return Promise.reject(result);
      }
      result.success = true;
      result.message = '';
      [result.result] = response.rows;
      return Promise.resolve(result);
    })
    .catch((error) => Promise.reject(error));
};

exports.loginUser = loginUser;
