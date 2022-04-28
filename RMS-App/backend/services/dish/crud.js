const { poolObj } = require('../connectDb');

const insert = function insert(
  dishName,
  isVeg,
  cuisine,
  itemType,
  profitPercent,
) {
  const query = `insert into dish(dish_name, is_veg,
    cuisine, item_type, profit_percentage)
    values($1, $2, $3, $4, $5)
    returning *`;

  return poolObj
    .query(query, [dishName, isVeg, cuisine, itemType, profitPercent])
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
  const query = `select * from dish
  where dish.dish_id = $1`;
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
  const query = `select * from dish 
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
