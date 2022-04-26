const { response } = require("express");

const pool_obj = require("./connect_db").pool_obj;

const insert = function (position, occupancy) {
  query = `insert into tbl(postion, occupancy) values ($1, $2)
  returning *`;

  return pool_obj
    .query(query, [position, occupancy])
    .then((response) => {
      return Promise.resolve({
        message: "Success",
        code: null,
        response: response.rows,
      });
    })
    .catch((error) => {
      return Promise.reject({
        message: error.message,
        code: error.code,
        response: null,
      });
    });
};

const dlete = function (table_id) {
  query = `delete * from tbl where tbl.table_id = $1 returning *`;

  return pool_obj
    .query(query, [table_id])
    .then((response) => {
      return Promise.resolve({
        message: "Success",
        code: null,
        response: response.rows,
      });
    })
    .catch((error) => {
      return Promise.reject({
        message: error.message,
        code: error.code,
        response: null,
      });
    });
};

const update = function (table_id, position, occupancy) {
  query = `Update tbl
  set position = $2, occupancy = $3
  where tbl.table_id = $1
  returning *`;

  return pool_obj
    .query(query, [table_id, position, occupancy])
    .then((response) => {
      return Promise.resolve({
        message: "Success",
        code: null,
        response: response.rows,
      });
    })
    .catch((error) => {
      return Promise.reject({
        message: error.message,
        code: error.code,
        response: null,
      });
    });
};

const get_info = function (skip, lim) {
  query = `select * from tbl 
  limit $2 offset $1`;
  return pool_obj.query(query, [skip, lim]).then((response) => {
    return Promise.resolve({
      message: "Success",
      code: null,
      response: response.rows,
    }).catch((error) => {
      return Promise.reject({
        message: error.message,
        code: error.code,
        response: null,
      });
    });
  });
};
exports.insert = insert;
exports.dlete = dlete;
exports.update = update;
exports.get_info = get_info;
