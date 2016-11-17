
var mysql = require('mysql');
var config = require('../config/database');
var db = mysql.createConnection(config);

module.exports = {

  index : function(req, res, next) {

    var userName = req.session.userName;

    var consulta = "SELECT ";
    consulta += "gastos.gastos_id, tipo_gasto.tipo_gasto_id, tipo_gasto.descripcion, ";
    consulta += "gastos.valor, gastos.fecha_creacion, gastos.usuario ";
    consulta += "FROM gastos, tipo_gasto ";
    consulta += "where gastos.tipo_gasto = tipo_gasto.tipo_gasto_id ";
    consulta += "and gastos.usuario = ? ";



    db.query(consulta, userName, function(error, rows, fields) {
        if (!error) {
          console.log('exito en el query.');
          console.log('se ha devuelto : ' + rows.length + ' numero de filas');
          var resultado = rows;

          res.render('gastos/index', {title: 'Gastos', userName: userName, resultado: resultado});
        } else {
          console.error('eror en el query');
          throw error;;
        }
    })

    /*

    SELECT
    gastos.gastos_id,
    tipo_gasto.tipo_gasto_id,
    tipo_gasto.descripcion,
    gastos.valor,
    gastos.fecha_creacion,
    gastos.usuario
    FROM
    gastos,
    tipo_gasto
    WHERE
    gastos.tipo_gasto = tipo_gasto.tipo_gasto_id
    AND
    gastos.usuario = 'hans3102@hotmail.com'

    */


  },

  mostrarFormularioNuevo : function(req, res, next) {
      res.render('gastos/nuevo', {title: 'Gastos'});
  }

};
