const pool_obj = require("./connect_db").pool_obj;

const register_user = function (firstname, surname, email, password) {
  query = `INSERT INTO users(firstname, surname, email, password)
  VALUES ($1, $2, $3, $4) RETURNING *`;
  return pool_obj
    .query(query, [firstname, surname, email, password])
    .then((response) => {
      return Promise.resolve(response.rows[0]);
    })
    .catch((error) => {
      console.log("Unable to insert the user");
      console.log(error);
      return Promise.reject(error);
    });
};

exports.register_user = register_user;
