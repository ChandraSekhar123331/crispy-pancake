const register_controller = require("../controllers/register");

const configure = function (app) {
  app.post("/register", register_controller.register_user);
};

module.exports = configure;
