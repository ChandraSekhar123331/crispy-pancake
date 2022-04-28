// You should not move this into any subdirectory of chef, attend or manager
// This file should be the home for functions that donot differentiate
// between chef, manager etc.. In a better sense these calls
// should be implementable using only operations on the employee table.
// register shouldnot be here as it by nature should access one of
// chef or attendant or manager
const bcrypt = require('bcryptjs');
const empGenericService = require('../../services/employee/generic');

const login = function login(req, res) {
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
  return empGenericService
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
      const matches = bcrypt.compareSync(password, user.emp_password);
      if (!matches) {
        return res.status(409).json({
          message: 'password provided doesnot match',
          code: -1,
          result: null,
        });
      }
      req.session.user = {
        id: user.emp_id,
        userName: user.user_name,
        fullName: user.emp_name,
        emailId: user.email_id,
        address: user.emp_address,
        role: user.emp_role,
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

const getOneInfo = function getOneInfo(req, res) {
  const { empId } = req.query;
  if (empId == null) {
    return res.status(409).json({
      message: "empId can't be null",
      code: -1,
      result: null,
    });
  }
  return empGenericService
    .getOneInfo(empId)
    .then((response) => {
      if (response.result.rowCount === 0) {
        return res.status(409).json({
          message: 'empId not found in the Database',
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
  return empGenericService
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

const update = function update(req, res) {};
// For delete to work in a role independent way, we
// need to do cascade on foreign key references..
// For attendant? Think
// For now we are deferring the implementation of dlete
// Both in the actual controller and also in this
// generic controller.
// const dlete = function dlete(req, res) {};

exports.login = login;
exports.update = update;
// exports.dlete = dlete;
exports.getOneInfo = getOneInfo;
exports.getAllInfo = getAllInfo;
