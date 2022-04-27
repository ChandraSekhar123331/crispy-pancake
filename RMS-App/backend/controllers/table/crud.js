const tableService = require('../../services/table/crud');

const insert = function insert(req, res) {
  const occupancy = req.query.occ;
  const position = req.query.posn;

  if (occupancy == null) {
    return res.status(409).json({ message: "occupancy can't be null" });
  }
  if (position == null) {
    return res.status(409).json({ message: "position can't be null" });
  }
  if (occupancy <= 0) {
    return res
      .status(409)
      .json({ message: 'occupancy should be greater than 0' });
  }
  return tableService
    .insert(position, occupancy)
    .then((response) => {
      res.status(200);
      return res.json(response);
    })
    .catch((error) => {
      res.status(409).json(error);
    });
};

const update = function update(req, res) {
  const { tableId } = req.query;
  const occupancy = req.query.occ;
  const position = req.query.posn;

  if (occupancy == null) {
    return res.status(409).json({ message: "occupancy can't be null" });
  }
  if (position == null) {
    return res.status(409).json({ message: "position can't be null" });
  }
  if (occupancy <= 0) {
    return res
      .status(409)
      .json({ message: 'occupancy should be greater than 0' });
  }
  return tableService
    .update(tableId, position, occupancy)
    .then((response) => {
      res.status(200);
      return res.json(response);
    })
    .catch((error) => {
      res.status(409).json(error);
    });
};

const dlete = function dlete(req, res) {
  const { tableId } = req.query;
  tableService
    .dlete(tableId)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(409).json(error));
};

const getAllInfo = function getAllInfo(req, res) {
  const { skip } = req.query;
  const { lim } = req.query;
  if (skip == null || lim == null || skip < 0 || lim < 0) {
    return res.status(409).json({ message: 'skip, lim should be geq 0' });
  }
  return tableService
    .getInfo(skip, lim)
    .then((response) => {
      console.log(response);
      return res.status(200).json(response);
    })
    .catch((error) => res.status(409).json(error));
};

const getOneInfo = function getOneInfo(req, res) {};

exports.insert = insert;
exports.update = update;
exports.dlete = dlete;
exports.getAllInfo = getAllInfo;
exports.getOneInfo = getOneInfo;
