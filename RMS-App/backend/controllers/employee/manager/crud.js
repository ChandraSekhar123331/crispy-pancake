const managerCrudService = require('../../../services/employee/manager/crud');

const insert = function insert(req, res) {
  const {
    userName,
    empName,
    address,
    emailId,
    phoneNum,
    password,
    salary,
    skill,
  } = req.query;

  if (userName == null) {
    return res.status(409).json({ message: "userName can't be null" });
  }
  if (empName == null) {
    return res.status(409).json({ message: "empName can't be null" });
  }
  if (address == null) {
    return res.status(409).json({ message: "address can't be null" });
  }
  if (emailId == null) {
    return res.status(409).json({ message: "emailId can't be null" });
  }
  if (phoneNum == null) {
    return res.status(409).json({ message: "phoneNum can't be null" });
  }
  if (password == null) {
    return res.status(409).json({ message: "password can't be null" });
  }
  if (salary == null) {
    return res.status(409).json({ message: "salary can't be null" });
  }
  if (skill == null) {
    return res
      .status(409)
      .json({ message: 'manager skill should not be null' });
  }

  // need to check if the email is already present;
  // need to check if the username is already used;
  // insert into Employee
  // Get the empId,
  // insert into Manager table now.
  managerCrudService.insert(
    userName,
    empName,
    address,
    emailId,
    phoneNum,
    password,
    'manager',
    salary,
  );

  managerCrudService.checkUniqueEmailEmp();
  // return managerCrudService
  //   .insert(userName)
  //   .then((response) => {
  //     res.status(200);
  //     return res.json(response);
  //   })
  //   .catch((error) => {
  //     res.status(409).json(error);
  //   });
};

const update = function update(req, res) {};

const dlete = function dlete(req, res) {};

const getAllInfo = function getAllInfo(req, res) {};

const getOneInfo = function getOneInfo(req, res) {};
exports.insert = insert;
exports.update = update;
exports.dlete = dlete;
exports.getAllInfo = getAllInfo;
exports.getOneInfo = getOneInfo;
