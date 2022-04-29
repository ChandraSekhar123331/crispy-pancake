const { poolObj } = require('../connectDb');

const topItemsByType = function topItemsByType(numTop) {
  const query = `with dish_qt(dish_id, net_qt, dish_type, dish_name) as (
    select dish.dish_id, sum(quantity), item_type, dish_name
    from ordered_items, dish
    where ordered_items.dish_id = dish.dish_id
    group by(dish.dish_id)
)
select dish_name, dish_type
from (
    select dish_id, 
    dish_name, 
    dish_type, 
    RANK() OVER(PARTITION BY dish_type ORDER BY net_qt DESC) as dish_rank
    from dish_qt
) as temp
where temp.dish_rank <= $1
ORDER BY dish_type, dish_rank ASC`;

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

const bestWeekDayByOrders = function bestWeekDayByOrders() {
  const query = `select day_of_week, count(*) as num_orders
  from (select to_char(bill_time, 'dy') as day_of_week from bill) as temp
  group by day_of_week
  ORDER BY num_orders DESC
  LIMIT 1;`;

  return poolObj
    .query(query, [])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};

const monthlySales = function monthlySales() {
  const query = `with bill_details(bill_id, net_bill, year, month_txt, month_num) as (
    select bill.bill_id as bill_id,
    SUM(price_per_unit * ordered_items.quantity) as net_bill, 
    extract(year from bill.bill_time) as year,
    to_char(bill.bill_time, 'month') as month_txt,
    extract(month from bill.bill_time) as month_num
    from ordered_items, bill
    where ordered_items.bill_id = bill.bill_id
    group by bill.bill_id
  )
  select year, month_txt, sum(net_bill) as total_sales
  from bill_details
  group by(year, month_num, month_txt)
  ORDER BY year, month_num ASC`;

  return poolObj
    .query(query, [])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};

exports.topItemsByType = topItemsByType;
exports.bestWeekDayByOrders = bestWeekDayByOrders;
exports.monthlySales = monthlySales;
