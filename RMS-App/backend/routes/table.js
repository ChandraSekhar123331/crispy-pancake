const express = require("express");

const router = express.Router();

const crud = require("../controllers/table/crud");

router.post("/insert", crud.insert);
router.post("/delete", crud.dlete);
router.post("/update", crud.update);
router.get("/get_info", crud.get_info);

module.exports = router;
