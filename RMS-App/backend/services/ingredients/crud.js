const { poolObj } = require('../connectDb');

const insert = function insert(dishId, stockId, quantity) {
  const query = `insert into ingredients(dish_id, stock_id, quantity)
  values($1, $2, $3)
  returning *`;

  return poolObj
    .query(query, [dishId, stockId, quantity])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};

const getOneInfo = function getOneInfo(dishId) {
  const query = `select dish_id, stock.stock_id, quantity as ingred_quantity, stock_name
  from (
    select *
    from dish
    where dish.dish_id = 1
  ) as D left outer join ingredients as ingred using (dish_id), stock
  where D.dish_id = ingred.dish_id
  and ingred.stock_id = stock.stock_id
  order by dish_id, ingred_quantity DESC, stock_id`;
  return poolObj
    .query(query, [dishId])
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
  const query = `select dish_id, stock.stock_id, quantity as ingred_quantity, stock_name
  from (
      select *
      from dish
      limit $1
      offset $2
  ) as D left outer join ingredients as ingred using (dish_id), stock
  where D.dish_id = ingred.dish_id
  and ingred.stock_id = stock.stock_id
  order by dish_id, ingred_quantity DESC, stock_id`;
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
