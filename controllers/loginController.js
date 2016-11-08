//var loginModel = require('../models/loginModel');
var pruebaModel = require('../models/pruebaModel');

module.exports = {

  // get.
  mostrarLogin:function(req, res, next) {
    console.log('Nombre de usuario: ' + req.session.user_id);
    res.render('login/login', { title: 'Login' });
  },

  mostrarSignup:function (req, res, next) {
    res.render('login/signup', {title: 'Signup'});
  },

  // post
  validarUsuario:function(req, res, next) {

    var mensaje = pruebaModel.mensaje;
    console.log('Mensaje del modelo : ' + mensaje);

    // BUG: queda pendiente.
    pruebaModel.mostrarMensaje;

    var email = req.body.email;
    var pass = req.body.contrasena;
    console.log('email : ' + email + ' contrasena: ' + pass);
    var resultado = {resultado:true}

    if (resultado) {
      req.session.user_id = email;
    }

    res.json(resultado)

  },

  registrarUsuario : function functionName() {

  }



};
