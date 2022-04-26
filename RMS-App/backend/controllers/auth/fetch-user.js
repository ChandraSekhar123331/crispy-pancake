const fetch_user = function (req, res) {
  if (req.sessionID && req.session.user) {
    res.status(200);
    return res.json({ user: req.session.user });
  }
  return res.sendStatus(403);
};
exports.fetch_user = fetch_user;
