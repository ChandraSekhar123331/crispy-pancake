const { poolObj } = require('../connectDb');

const getFreeTables = function getFreeTables(startTime) {
  const query = `select distinct(table_id)
  from table_booking
  where table_id not in (
    select table_id
    from table_booking
    where (start_time <= $1 and end_time >= $1) or 
    (start_time <= ($1 + (45 * interval '1 minute')) and end_time >= ($1 + (45 * interval '1 minute')))
  )
  ORDER BY table_id ASC`;

  return poolObj
    .query(query, [startTime])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};
const bookTable = function bookTable(billId, tableId, startTime) {
  const query = `insert into table_booking(bill_id, table_id, start_time, end_time)
  values($1, $2, $3, $3 + (45 * interval '1 minute'))
  returning *`;

  return poolObj
    .query(query, [billId, tableId, startTime])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};

const getFreeTablesFloor = function getFreeTablesFloor(
  startTime,
  floor,
  occupancy,
) {
  const query = `select distinct(table_booking.table_id)
  from table_booking, tbl
  where table_booking.table_id not in (
    select table_id
    from table_booking
    where (start_time <= $1 and end_time >= $1) or 
    (start_time <= ($1 + (45 * interval '1 minute')) and end_time >= ($1 + (45 * interval '1 minute')))
  )
  and tbl.table_id = table_booking.table_id
  and position = $2
  and occupancy >= $3
  ORDER BY table_id ASC`;

  return poolObj
    .query(query, [startTime, floor, occupancy])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};
exports.getFreeTables = getFreeTables;
exports.bookTable = bookTable;
exports.getFreeTablesFloor = getFreeTablesFloor;
