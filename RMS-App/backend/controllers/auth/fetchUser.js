const fetchUser = function fetchUser(req, res) {
  if (req.sessionID && req.session.user) {
    res.status(200);
    return res.json({ user: req.session.user });
  }
  return res.sendStatus(403);
};
exports.fetchUser = fetchUser;
