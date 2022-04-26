const logout_user = function (req, res) {
  try{
    await req.session.destroy();
    return res.sendStatus(200);
  } catch(e){
    console.log(e);
    return res.sendStatus(500);
  }
};

exports.logout_user = logout_user