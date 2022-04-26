const register_controller = require("../controllers/register");
const login_controller = require("../controllers/login");
const logout_controller = require("../controllers/logout");
const fetch_user_controller = require("../controllers/fetch-user");

const express = require("express");
let router = express.Router();
router.post("/register", register_controller.register_user);
router.post("/login", login_controller.login_user);
router.post("/logout", logout_controller.logout_user);
router.post("/fetch-user", fetch_user_controller.fetch_user);

module.exports = router;
