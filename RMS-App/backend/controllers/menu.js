const menuService = require('../services/menu');

const basicMenu = function basicMenu(req, res) {
  const { skip, lim } = req.query;
  if (skip == null || lim == null) {
    return res.status(409).json({
      message: "skip, lim can't be null",
      code: -1,
      result: null,
    });
  }
  if (skip < 0) {
    return res.status(409).json({
      message: 'skip should be non-negative',
      code: -1,
      result: null,
    });
  }
  if (lim < 0) {
    return res.status(409).json({
      message: 'lim should be non-negative',
      code: -1,
      result: null,
    });
  }
  return menuService
    .refreshMenu()
    .then(() =>
      menuService
        .basicMenu(skip, lim)
        .then((response) =>
          res.status(200).json({
            message: 'Success',
            code: 0,
            result: response.result.rows,
          }),
        )
        .catch((error) =>
          res.status(409).json({
            message: error.message,
            code: -1,
            result: null,
          }),
        ),
    )
    .catch((error) =>
      res.status(409).json({
        message: error.message,
        code: -1,
        result: null,
      }),
    );
};

exports.basicMenu = basicMenu;
