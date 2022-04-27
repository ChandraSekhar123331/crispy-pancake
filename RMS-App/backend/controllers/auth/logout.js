const logoutUser = async function logoutUser(req, res) {
  try {
    await req.session.destroy();
    return res.sendStatus(200);
  } catch (e) {
    return res.sendStatus(500);
  }
};

exports.logoutUser = logoutUser;
