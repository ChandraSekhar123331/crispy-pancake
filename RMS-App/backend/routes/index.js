const register_controller = require("../controllers/register");
const login_controller = require("../controllers/login");
const logout_controller = require("../controllers/logout");
const fetch_user_controller = require("../controllers/fetch-user");
const configure = function (app) {
  app.post("/register", register_controller.register_user);
  app.post("/login", login_controller.login_user);
  app.post("/logout", logout_controller.logout_user);
  app.post("/fetch-user", fetch_user_controller.fetch_user);
};

module.exports = configure;
