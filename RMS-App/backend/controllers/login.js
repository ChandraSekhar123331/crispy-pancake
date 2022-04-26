const bcrypt = require("bcryptjs");

const login_user = function (req, res) {
  const { email, password } = req.query;

  if (email == null || password == null) {
    return res.sendStatus(403);
  }

  require("../services/login")
    .login_user(email)
    .then((response) => {
      const user = response;
      const matches = bcrypt.compareSync(password, user.password);
      if (!matches) {
        return res.sendStatus(403);
      }

      req.session.user = {
        id: user.id,
        firstname: user.firstname,
        surname: user.surname,
        email: user.email,
      };

      res.status(200);
      return res.json({ user: req.session.user });
    })
    .catch((error) => {
      console.log(error);
      return res.sendStatus(403);
    });
};

exports.login_user = login_user;
