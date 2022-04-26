const pool_obj = require("./connect_db").pool_obj;

const login_user = function (email) {
  query = `SELECT id, firstname, surname, email, password FROM 
  users WHERE email = $1`;
  return pool_obj
    .query(query, [email])
    .then((response) => {
      let result = {
        success: false,
        error_message: "",
        result: null,
      };
      if (response.rowCount == 0) {
        result.success = false;
        result.error_message = "User with this email doesnot exist";
        result.result = null;
        return Promise.reject(result);
      } else {
        result.success = true;
        result.error_message = "";
        result.result = response.rows[0];
        return Promise.resolve(result);
      }
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

exports.login_user = login_user;
