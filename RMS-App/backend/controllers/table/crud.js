const { response } = require("express");
const table_service = require("../../services/table");

const insert = function (req, res) {
  const occupancy = req.query.occ;
  const position = req.query.posn;

  if (occupancy == null) {
    return res.status(409).json({
      message: "occupancy can't be null",
    });
  }
  if (position == null) {
    return res.status(409).json({
      message: "position can't be null",
    });
  }
  if (occupancy <= 0) {
    return res.status(409).json({
      message: "occupancy should be greater than 0",
    });
  }
  table_service
    .insert(position, occupancy)
    .then((response) => {
      res.status(200);
      return res.json(response);
    })
    .catch((error) => {
      res.status(409).json(error);
    });
};

const update = function (req, res) {
  const table_id = req.query.table_id;
  const occupancy = req.query.occ;
  const position = req.query.posn;

  if (occupancy == null) {
    return res.status(409).json({
      message: "occupancy can't be null",
    });
  }
  if (position == null) {
    return res.status(409).json({
      message: "position can't be null",
    });
  }
  if (occupancy <= 0) {
    return res.status(409).json({
      message: "occupancy should be greater than 0",
    });
  }
  table_service
    .update(table_id, position, occupancy)
    .then((response) => {
      res.status(200);
      return res.json(response);
    })
    .catch((error) => {
      res.status(409).json(error);
    });
};

const dlete = function (req, res) {
  const table_id = req.query.table_id;
  table_service
    .dlete(table_id)
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(409).json(error);
    });
};

const get_info = function (req, res) {
  const skip = req.query.skip;
  const lim = req.query.lim;
  if (skip == null || lim == null || skip < 0 || lim < 0) {
    return res.status(409).json({
      message: "skip, lim should be geq 0",
    });
  }
  table_service
    .get_info(skip, lim)
    .then((response) => {
      console.log(response);
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(409).json(error);
    });
};

exports.insert = insert;
exports.update = update;
exports.dlete = dlete;
exports.get_info = get_info;
