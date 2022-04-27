const { poolObj } = require('../connectDb');

const insert = function insert(stockName, quantityLeft, minReqd, pricePerUnit) {
  const query = `insert into stock(stock_name, quantity_left, 
    min_required, price_per_unit)
    values($1, $2, $3, $4)
    returning *`;

  return poolObj
    .query(query, [stockName, quantityLeft, minReqd, pricePerUnit])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};

const getOneInfo = function getOneInfo(stockId) {
  const query = `select * 
  from stock 
  where stock_id = $1`;
  return poolObj
    .query(query, [stockId])
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
  const query = `select * 
  from stock 
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
