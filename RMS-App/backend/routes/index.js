const auth_routes = require("./auth");

const configure_routes = function (app) {
  app.use("/auth", auth_routes);
};

module.exports = configure_routes;
