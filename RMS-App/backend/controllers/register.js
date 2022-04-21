const bcrypt = require("bcryptjs");

const register_user = function (req, res) {
  const { firstname, surname, email, password } = req.body;

  if (
    firstname == null ||
    surname == null ||
    email == null ||
    password == null
  ) {
    console.log(firstname, surname, email, password);
    return res.sendStatus(403);
  }

  const hashedPassword = bcrypt.hashSync(password, 30);
  require("../services/register")
    .register_user(firstname, surname, email, hashedPassword)
    .then((response) => {
      const user = response;
      req.session.user = {
        id: user.id,
        firstname: user.firstname,
        surname: user.surname,
        email: user.email,
      };
      res.status(200);
      return res.json({ user: req.session.user });
    });
};

exports.register_user = register_user;
