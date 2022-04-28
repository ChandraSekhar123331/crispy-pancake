const { poolObj } = require('../connectDb');

const insert = function insert(billId, dishId, quantity) {
  const query = `insert into ordered_items(bill_id, dish_id, quantity, price_per_unit, rating)
      select $1, $2, $3, dish_price, null
      from (
        select dish.dish_id,
        dish.dish_name,
        sum(ing.quantity * stock.price_per_unit) * (1 + dish.profit_percentage/100.0) as dish_price
        from ingredients as ing, stock, dish
        where ing.stock_id = stock.stock_id
        AND dish.dish_id = ing.dish_id
        AND dish.dish_id = $2
        group by(dish.dish_id)
      ) as temp_reln`;

  return poolObj
    .query(query, [billId, dishId, quantity])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};

exports.insert = insert;
