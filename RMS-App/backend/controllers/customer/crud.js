const bcrypt = require('bcryptjs');
const customerCrudService = require('../../services/customer/crud');

const insert = function insert(req, res) {
  console.log(req.body);
  const { userName, fullName, emailId, phoneNumber, address, password, terms } =
    req.body;

  if (userName == null) {
    return res.status(409).json({
      message: "userName can't be null",
      code: -1,
      result: null,
    });
  }
  if (fullName == null) {
    return res.status(409).json({
      message: "fullName can't be null",
      code: -1,
      result: null,
    });
  }
  if (emailId == null) {
    return res.status(409).json({
      message: "emailId can't be null",
      code: -1,
      result: null,
    });
  }
  if (phoneNumber == null) {
    return res.status(409).json({
      message: "phoneNumber can't be null",
      code: -1,
      result: null,
    });
  }
  if (address == null) {
    return res.status(409).json({
      message: "address can't be null",
      code: -1,
      result: null,
    });
  }
  if (password == null) {
    return res.status(409).json({
      message: "password can't be null",
      code: -1,
      result: null,
    });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  return customerCrudService
    .insert(userName, fullName, emailId, phoneNumber, address, hashedPassword)
    .then((response) => {
      const user = response.result.rows[0];
      // req.session.user = {
      //   id: user.customer_id,
      //   userName: user.user_name,
      //   fullName: user.full_name,
      //   emailId: user.email_id,
      //   address: user.cust_address,
      //   role: 'customer',
      // };
      return res.status(200).json({
        message: 'Success',
        code: 0,
        result: {
          id: user.customer_id,
          userName: user.user_name,
          fullName: user.full_name,
          emailId: user.email_id,
          address: user.cust_address,
          role: 'customer',
        },
      });
    })
    .catch((error) =>
      res.status(409).json({
        message: error.message,
        code: -1,
        result: null,
      }),
    );
};
const getAllInfo = function getAllInfo(req, res) {
  const { skip, lim } = req.query;
  if (skip == null || lim == null) {
    return res.status(409).json({
      message: "skip, lim can't be null",
      code: -1,
      result: null,
    });
  }
  if (skip < 0) {
    return res.status(409).json({
      message: 'skip should be non-negative',
      code: -1,
      result: null,
    });
  }
  if (lim < 0) {
    return res.status(409).json({
      message: 'lim should be non-negative',
      code: -1,
      result: null,
    });
  }
  return customerCrudService
    .getAllInfo(skip, lim)
    .then((response) =>
      res.status(200).json({
        message: 'Success',
        code: 0,
        result: response.result.rows,
      }),
    )
    .catch((error) =>
      res.status(409).json({
        message: error.message,
        code: -1,
        result: null,
      }),
    );
};
const getOneInfo = function getOneInfo(req, res) {
  const { customerId } = req.query;
  if (customerId == null) {
    return res.status(409).json({
      message: "customerId can't be null",
      code: -1,
      result: null,
    });
  }
  return customerCrudService
    .getOneInfo(customerId)
    .then((response) => {
      if (response.result.rowCount === 0) {
        return res.status(409).json({
          message: 'customerId not found in the Database',
          code: -1,
          result: null,
        });
      }
      return res.status(200).json({
        message: 'Success',
        code: 0,
        result: response.result.rows[0],
      });
    })
    .catch((error) =>
      res.status(409).json({
        message: error.message,
        code: -1,
        result: null,
      }),
    );
};

const update = function update(req, res) {};

exports.insert = insert;
exports.update = update;
exports.getAllInfo = getAllInfo;
exports.getOneInfo = getOneInfo;
