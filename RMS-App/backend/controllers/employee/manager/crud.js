// dlete function (most likely) can directly be implemented in common file

const empGenericService = require('../../../services/employee/generic');
const managerCrudService = require('../../../services/employee/manager/crud');

const insert = function insert(req, res) {
  const {
    userName,
    empName,
    emailId,
    phoneNum,
    address,
    password,
    salary,
    skill,
  } = req.query;

  if (userName == null) {
    return res.status(409).json({
      message: "userName can't be null",
      code: -1,
      result: null,
    });
  }
  if (empName == null) {
    return res.status(409).json({
      message: "empName can't be null",
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
  if (phoneNum == null) {
    return res.status(409).json({
      message: "phoneNum can't be null",
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
  if (salary == null) {
    return res.status(409).json({
      message: "salary can't be null",
      code: -1,
      result: null,
    });
  }
  if (skill == null) {
    return res.status(409).json({
      message: "skill can't be null",
      code: -1,
      result: null,
    });
  }

  // Not doing these explicitly for now.
  // need to check if the email is already present;
  // need to check if the username is already used;

  // insert into Employee
  // Get the empId,
  // insert into Manager table now.
  return empGenericService
    .insert(
      userName,
      empName,
      emailId,
      phoneNum,
      address,
      password,
      'manager',
      salary,
    )
    .then((response) => {
      const emp = response.result.rows[0];
      const empId = emp.emp_id;
      managerCrudService
        .insert(empId, skill)
        .then(() =>
          res.status(200).json({
            message: 'Success',
            code: 0,
            result: {
              id: emp.emp_id,
              userName: emp.user_name,
              fullName: emp.emp_name,
              emailId: emp.email_id,
              address: emp.emp_address,
              role: emp.emp_role,
              skill,
            },
          }),
        )
        .catch((error) =>
          res.status(409).json({
            message: error.message,
            code: -1,
            result: null,
          }),
        );
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
  return managerCrudService
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
  const { empId } = req.query;
  if (empId == null) {
    return res.status(409).json({
      message: "empId can't be null",
      code: -1,
      result: null,
    });
  }
  return managerCrudService
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

const update = function update(req, res) {};

exports.insert = insert;
exports.getAllInfo = getAllInfo;
exports.getOneInfo = getOneInfo;
exports.update = update;
