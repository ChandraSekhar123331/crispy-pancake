const bcrypt = require('bcryptjs');
const customerLoginService = require('../../services/customer/login');

const loginUser = function loginUser(req, res) {
  const { emailId, password } = req.query;
  if (emailId == null) {
    return res.status(409).json({
      message: "emailId can't be null",
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
  return customerLoginService
    .getUser(emailId)
    .then((response) => {
      if (response.result.rowCount === 0) {
        return res.status(409).json({
          message: 'emailId not found in the database',
          code: -1,
          result: null,
        });
      }
      const user = response.result.rows[0];
      const matches = bcrypt.compareSync(password, user.cust_password);
      if (!matches) {
        return res.status(409).json({
          message: 'password provided doesnot match',
          code: -1,
          result: null,
        });
      }
      req.session.user = {
        id: user.customer_id,
        userName: user.user_name,
        fullName: user.full_name,
        emailId: user.email_id,
        address: user.cust_address,
        role: 'customer',
      };
      return res.status(200).json({
        message: 'Success',
        code: 0,
        result: req.session.user,
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

exports.loginUser = loginUser;
