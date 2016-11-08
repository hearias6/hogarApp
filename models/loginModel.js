var con = require('./conexion');
var db = con.conectar;

var Login = {};

Login.validarUsuario = function(callback) {

  var sql = 'select email, contrasena from usuarios';
  var respuesta = null;

  db.quer(sql,function(error, filas, campos) {
      if (error) {
        throw error;
      } else {
        console.log('existen.');
        respuesta = filas;
        console.log('respuesta: ' + respuesta);j
        callback(200,respuesta);
      }
  })

}

module.exports = Login;
