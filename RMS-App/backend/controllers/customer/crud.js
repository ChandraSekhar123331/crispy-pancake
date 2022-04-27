// const bcrypt = require('bcryptjs');
// const registerService = require('../../services/register');

const insert = function insert(req, res) {
  // const { firstname, surname, email, password } = req.query;
  // if (
  //   firstname == null ||
  //   surname == null ||
  //   email == null ||
  //   password == null
  // ) {
  //   return res.sendStatus(403);
  // }
  // const hashedPassword = bcrypt.hashSync(password, 10);
  // return registerService
  //   .registerUser(firstname, surname, email, hashedPassword)
  //   .then((response) => {
  //     const user = response;
  //     req.session.user = {
  //       id: user.id,
  //       firstname: user.firstname,
  //       surname: user.surname,
  //       email: user.email,
  //     };
  //     res.status(200);
  //     return res.json({ user: req.session.user });
  //   })
  //   .catch(() => {
  //     res.status(403);
  //     return res.json({ message: 'Unable to insert the user' });
  //   });
};
const update = function update(req, res) {};
const getAllInfo = function getAllInfo(req, res) {};
const getOneInfo = function getOneInfo(req, res) {};

exports.insert = insert;
exports.update = update;
exports.getAllInfo = getAllInfo;
exports.getOneInfo = getOneInfo;
