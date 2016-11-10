
var mysql = require('mysql');
var config = require('../config/database');
var db = mysql.createConnection(config);


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

    var email = req.body.email;
    var contrasena = req.body.contrasena;
    console.log('email: ' + email + ' Contrasena: ' + contrasena);
    var resultado = {resultado:null}

    var consulta = "select email from usuarios where email = ? and contrasena = ?";

    var resultado = {resultado:false};

    var filas = null;

    db.query(consulta,[email, contrasena],function(error, rows, filds) {
      if (error) {
        console.log('Error en la consulta.');
        resultado.resultado = false;
        throw error;
      }else{

        console.log('funciona el query');

        filas = rows.length;

        console.log('filas: ' + filas);

        if (filas === 1) {
          console.log('coinciden');
          resultado.resultado = true;
        } else {
          console.log('no coinciden');
          resultado.resultado = false;
        }

        res.json(resultado);

      }

    });

  },

  registrarUsuario : function(req, res, next) {

      console.log('registrar usuario controller');

      var email = req.body.email;
      console.log('email: ' + email);

      var pass = req.body.contrasena;
      console.log('pass: ' + pass);

      var resultado = {resultado : 'success'}

      res.json(resultado);
  }



};
