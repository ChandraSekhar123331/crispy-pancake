const { poolObj } = require('../../connectDb');

const getFreeOnlineAttendant = function getFreeOnlineAttendant() {
  const query = `select attendant_id 
  from attendant, employee
  where attendant_id not in (
    select attendant_id from attended_by
    where delivered = false
  ) and attendant_role = 'online'
  and attendant.attendant_id = employee.emp_id
  and fired = false
  order by Random()
  limit 1;`;
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

const assignAttendant = function assignAttendant(billId, attendantId) {
  const query = `insert into attended_by(bill_id, 
    attendant_id, delivered, rating)
    values($1, $2, false, null)
    returning *`;
  return poolObj
    .query(query, [billId, attendantId])
    .then((response) =>
      Promise.resolve({
        message: 'Success',
        code: 0,
        result: response,
      }),
    )
    .catch((error) => Promise.reject(new Error(error.message)));
};

const getFreeOfflineAttendant = function getFreeOfflineAttendant() {
  const query = `select attendant_id 
  from attendant,employee
  where attendant_id not in (
    select attendant_id from attended_by
    where delivered = false
  ) and attendant_role = 'hotel' 
  and attendant_id=emp_id 
  and fired=false
  order by Random()
  limit 1;`;
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
exports.getFreeOnlineAttendant = getFreeOnlineAttendant;
exports.assignAttendant = assignAttendant;
exports.getFreeOfflineAttendant = getFreeOfflineAttendant;
