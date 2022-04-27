const { poolObj } = require('./connectDb');

const registerUser = function registerUser(
  firstname,
  surname,
  email,
  password,
) {
  const query = `INSERT INTO users(firstname, surname, email, password)
  VALUES ($1, $2, $3, $4) RETURNING *`;
  return poolObj
    .query(query, [firstname, surname, email, password])
    .then((response) => Promise.resolve(response.rows[0]))
    .catch((error) => {
      console.log('Unable to register the user');
      return Promise.reject(error);
    });
};

exports.registerUser = registerUser;
