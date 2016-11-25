
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

    function encriptar(email, pass) {
        var crypto = require('crypto');
        var hmac = crypto.createHmac('sha1', email).update(pass).digest('hex');
        return hmac
    }

   var passEncriptada = encriptar(email,contrasena);

    console.log('email: ' + email + ' Contrasena: ' + contrasena + ' passEncriptada: ' + passEncriptada);

    var resultado = {resultado:null}

    var consulta = "select email from usuarios where email = ? and contrasena = ?";

    var filas = null;

    db.query(consulta,[email, passEncriptada],function(error, rows, filds) {
      if (error) {
        console.log('Error en la consulta.');
        resultado.resultado = 'error';
        throw error;
      }else{

        console.log('funciona el query');

        filas = rows.length;

        console.log('filas: ' + filas);

        if (filas === 1) {
          console.log('coinciden');
          resultado.resultado = 'success';
          req.session.userName = email;
        } else {
          console.log('no coinciden');
          resultado.resultado = 'no existe';
        }

        res.json(resultado);

      }

    });

  },

  registrarUsuario : function(req, res, next) {

      var email = req.body.email;
      var pass = req.body.contrasena;

      function encriptar(email, pass) {
          var crypto = require('crypto');
          var hmac = crypto.createHmac('sha1', email).update(pass).digest('hex');
          return hmac
      }

      var passEncriptada = encriptar(email,pass);

      var datos = {email : email, contrasena : passEncriptada}
      var resultado = {resultado:null};

      console.log('email: ' + email + ' pass: ' + pass + ' passEncriptada: ' + passEncriptada);

      var consulta = 'insert into usuarios set ?';

      db.query(consulta, datos, function(err, result) {
          if (err) {
              console.log('error en la consulta');
              throw err;
              resultado.resultado = 'error'
          } else {
              console.log('exito en la consulta');
              resultado.resultado = "success";
              console.log('resultado : ' + result);
          }

          res.json(resultado);
      })

  },

  cerrarSesion: function(req, res, next) {
    req.session.userName = null;
    console.log('cerrar sesion: ' + req.session.userName);
    res.redirect('/');
  }

};
