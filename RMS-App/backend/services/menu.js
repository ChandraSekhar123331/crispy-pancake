const { poolObj } = require('./connectDb');

const refreshMenu = function refreshMenu() {
  const query = 'refresh materialized view menu';

  return poolObj
    .query(query)
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};

const basicMenu = function basicMenu(skip, lim) {
  const query = `select * 
  from menu
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

exports.refreshMenu = refreshMenu;
exports.basicMenu = basicMenu;
