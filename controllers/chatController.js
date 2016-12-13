
module.exports = {

  index: function(req, res, next) {
    var userName = req.session.userName;

    if (userName !== undefined) {
      res.render('chat/chat',{email:userName});
    } else {
      res.send('no estas logeado..');
    }

  }

};
