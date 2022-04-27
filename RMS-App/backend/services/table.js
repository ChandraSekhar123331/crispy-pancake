const { poolObj } = require('./connectDb');

const insert = function insert(position, occupancy) {
  const query = `insert into tbl(postion, occupancy) values ($1, $2)
  returning *`;

  return poolObj
    .query(query, [position, occupancy])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: null,
        response: response.rows,
      }),
    )
    .catch((error) =>
      Promise.reject(
        new Error({
          message: error.message,
          code: error.code,
          response: null,
        }),
      ),
    );
};

const dlete = function dlete(tableId) {
  const query = 'delete * from tbl where tbl.table_id = $1 returning *';

  return poolObj
    .query(query, [tableId])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: null,
        response: response.rows,
      }),
    )
    .catch((error) =>
      Promise.reject(
        new Error({
          message: error.message,
          code: error.code,
          response: null,
        }),
      ),
    );
};

const update = function update(tableId, position, occupancy) {
  const query = `Update tbl
  set position = $2, occupancy = $3
  where tbl.table_id = $1
  returning *`;

  return poolObj
    .query(query, [tableId, position, occupancy])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: null,
        response: response.rows,
      }),
    )
    .catch((error) =>
      Promise.reject(
        new Error({
          message: error.message,
          code: error.code,
          response: null,
        }),
      ),
    );
};

const getInfo = function getInfo(skip, lim) {
  const query = `select * from tbl 
  limit $2 offset $1`;
  return poolObj.query(query, [skip, lim]).then((response) =>
    Promise.resolve({
      message: 'Success',
      code: null,
      response: response.rows,
    }).catch((error) =>
      Promise.reject(
        new Error({
          message: error.message,
          code: error.code,
          response: null,
        }),
      ),
    ),
  );
};
exports.insert = insert;
exports.dlete = dlete;
exports.update = update;
exports.getInfo = getInfo;
