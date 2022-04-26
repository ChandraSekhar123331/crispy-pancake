const auth_routes = require("./auth");
const tbl_routes = require("./table");

const configure_routes = function (app) {
  app.use("/auth", auth_routes);
  app.use("/table", tbl_routes);
};

module.exports = configure_routes;
