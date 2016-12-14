var mysql = require('mysql');
var config = require('../config/database');
var db = mysql.createConnection(config);


module.exports = {

  index: function(req, res, next) {
    var userName = req.session.userName;

    if (userName !== undefined) {
      res.render('chat/chat',{email:userName});
    } else {
      res.send('no estas logeado..');
    }

  },

  guardarMensaje : function(req, res, next) {

    var userName = req.session.userName;
    var mensaje = req.body.chat;

    var Moment = require('moment-timezone');
    var fecha_mensaje = Moment().tz('America/Bogota').format("YYYY-MM-DD");
    var hora_mensaje = Moment().tz('America/Bogota').format("HH:MM");

    console.log('usuario: ' + userName + ' mensaje: ' + mensaje);
    console.log('fecha: ' + fecha_mensaje + ' hora: ' + hora_mensaje);

    var datos = {
      usuario:userName,
      mensaje:mensaje,
      fecha_mensaje:fecha_mensaje,
      hora_mensaje: hora_mensaje
    };

    var sql = 'insert into chat set ?';
    var respuesta = {resultado:null, mensaje:null};

    db.query(sql, datos, function(error, result) {
      if (!error) {
        console.log('query es un exito insert en chatController');
        respuesta.resultado = 'success';
        respuesta.mensaje = 'se ha registrado con exito.';
      } else {
        console.log('error en la consulta: ' + consulta);
        respuesta.resultado = 'error';
        respuesta.mensaje = 'Hay un error, valide en el sistema';
        throw error;
      }

      res.send(respuesta);

    })

  }

};
