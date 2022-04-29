const { poolObj } = require('../connectDb');

const topDishByRevenue = function topDishByRevenue(numTop) {
  const query = `with temp(dish_id, revenue) as (
    select dish_id, sum(quantity * price_per_unit)/1000000 as revenue
    from ordered_items
    group by(dish_id)
)
select temp.dish_id, dish.dish_name , revenue as revenue_million
from temp, dish
where temp.dish_id = dish.dish_id
order by revenue_million DESC
limit $1;`;

  return poolObj
    .query(query, [numTop])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};

const topDishBySales = function topDishBySales(numTop) {
  const query = `with temp(dish_id, sales) as (
    select dish_id, sum(quantity)*1.0/1000 as sales
    from ordered_items
    group by(dish_id)
)
select temp.dish_id, dish.dish_name , sales as sales_1K
from temp, dish
where temp.dish_id = dish.dish_id
order by sales_1K DESC
limit $1;`;

  return poolObj
    .query(query, [numTop])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};

const worstDishByRevenue = function worstDishByRevenue(numTop) {
  const query = `with temp(dish_id, revenue) as (
        select dish_id, sum(quantity * price_per_unit)/1000000 as revenue
        from ordered_items
        group by(dish_id)
    )
    select temp.dish_id, dish.dish_name , revenue as revenue_million
    from temp, dish
    where temp.dish_id = dish.dish_id
    order by revenue_million ASC
    limit $1;`;

  return poolObj
    .query(query, [numTop])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};

const worstDishBySales = function worstDishBySales(numTop) {
  const query = `with temp(dish_id, sales) as (
        select dish_id, sum(quantity)*1.0/1000 as sales
        from ordered_items
        group by(dish_id)
    )
    select temp.dish_id, dish.dish_name , sales as sales_1K
    from temp, dish
    where temp.dish_id = dish.dish_id
    order by sales_1K ASC
    limit $1`;

  return poolObj
    .query(query, [numTop])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};

exports.topDishByRevenue = topDishByRevenue;
exports.topDishBySales = topDishBySales;
exports.worstDishByRevenue = worstDishByRevenue;
exports.worstDishBySales = worstDishBySales;
