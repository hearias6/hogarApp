
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
          console.error('eror en la consulta de index.');
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
  },

  registrar : function(req, res, next) {

    var userName = req.session.userName;

    var datos = {
      valor : req.body.txtValor,
      fecha_creacion : req.body.dateFechaCreacion,
      fecha_modificacion : req.body.dateFechaCreacion,
      tipo_gasto : req.body.comboCategoria,
      usuario : userName
    };

    console.log('valor: ' + datos.valor + ' fecha_creacion: ' + datos.fecha_creacion + ' tipo_gasto: ' + datos.tipo_gasto + ' usuario: ' + datos.usuario);

    var consulta = 'insert into gastos set ?';
    var respuesta = {respuesta:null};

    db.query(consulta, datos, function(error, result) {
      if (!error) {
        console.log('query es un exito insert');
        respuesta.respuesta = 'success';
      } else {
        console.log('error en la consulta: ' + consulta);
        respuesta.respuesta = 'error';
        throw error;
      }

      res.send(respuesta);

    })
  },

  mostrarFormularioEditar : function(req, res, next) {

    var userName = req.session.userName;

    if (userName !== undefined) {

      var id = req.params.id;
      console.log('id: ' + id);

      var consulta = '';
      consulta += 'select ';
      consulta += 'gastos.gastos_id, tipo_gasto.tipo_gasto_id, tipo_gasto.descripcion, ';
      consulta += 'gastos.valor, gastos.fecha_creacion, gastos.usuario ';
      consulta += 'FROM gastos, tipo_gasto ';
      consulta += 'WHERE gastos.tipo_gasto = tipo_gasto.tipo_gasto_id ';
      consulta += 'AND gastos.gastos_id = ? ';

      /*
      SELECT
      gastos.gastos_id, tipo_gasto.tipo_gasto_id, tipo_gasto.descripcion,
      gastos.valor, gastos.fecha_creacion,gastos.usuario
      FROM gastos, tipo_gasto
      WHERE gastos.tipo_gasto = tipo_gasto.tipo_gasto_id
      AND gastos.gastos_id = ''
      */

      db.query(consulta, id, function(error, rows, filds) {
        if (!error) {
          console.log('exito en el query editar.');
          console.log('rows: ' + rows.length);

          if (rows.length == 1) {
              var resultado = rows;
          }

          res.render('gastos/editar',{
            title:'Editar Gasto',
            resultado: resultado
          });

        } else {
          console.log('error en el query editar');
          throw error;
        }

      })

    } else {
      res.send('no estas logeado');
    }

  },

  actualizar : function (req, res, next) {

    var userName = req.session.userName;

    if (userName !== undefined) {

      var datos = {
        valor : req.body.txtValor,
        fecha_modificacion : req.body.dateFechaCreacion,
        tipo_gasto : req.body.comboCategoria,
        usuario : userName
      };

      console.log('valor: ' + datos.valor + ' tipo_gasto: ' + datos.tipo_gasto );

      var id = req.body.id;

      console.log('id: ' + id);

      var respuesta = {respuesta:null}

      var consulta = 'update gastos set ? where gastos_id = ? ';

      db.query(consulta,[datos, id], function(error, rows, fields) {
        if (!error) {
          console.log('exito en el query');
          console.log('rows: ' + rows.length);
          respuesta.respuesta = 'success';
        } else {
          console.log('erro en la consulta');
          console.log('consulta ' + consulta);
          throw error;
          respuesta.respuesta = 'error';
        }

        res.send(respuesta);

      });

    } else {
      res.send('no estas logeado');
    }

  }

};
