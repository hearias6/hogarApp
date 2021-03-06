
var mysql = require('mysql');
var config = require('../config/database');
var db = mysql.createConnection(config);

module.exports = {

  index : function(req, res, next) {

    var userName = req.session.userName;
    var consulta = "SELECT g.gastos_id, tg.tipo_gasto_id, tg.descripcion, g.valor, g.fecha_creacion, g.usuario FROM gastos as g, tipo_gasto as tg where g.tipo_gasto = tg.tipo_gasto_id and g.usuario = ? ";

    db.query(consulta, userName, function(error, rows, fields) {
        if (!error) {
          console.log('exito en el query.');
          console.log('se ha devuelto : ' + rows.length + ' numero de filas');
          var filas = rows.length;
          var resultado = rows;

          res.render('gastos/index', {title: 'Gastos', userName: userName, resultado: resultado, filas:filas});
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

    var consulta = 'select tipo_gasto_id, descripcion FROM tipo_gasto';

    db.query(consulta, function(error, rows, filds) {
      if (!error) {
        console.log('exito en el query.');
        if (rows.length > 0) {
          var filas = rows;
          res.render('gastos/nuevo', {title: 'Gastos', filas:filas});
        }
      } else {
        console.error('error en el query: ' + consulta);
        throw error;
      }
    })

  },

  registrar : function(req, res, next) {

    var userName = req.session.userName;

    // fecha actual.
    var Moment = require('moment-timezone');
    var date = Moment().tz('America/Bogota').format("YYYY-MM-DD");
    console.log('fecha actual de registrar ingreso : ' + date);

    var datos = {
      valor : req.body.txtValor,
      fecha_creacion : date,
      fecha_modificacion : date,
      tipo_gasto : req.body.comboCategoria,
      usuario : userName
    };

    console.log('valor: ' + datos.valor + ' fecha_creacion: ' + date + ' tipo_gasto: ' + datos.tipo_gasto + ' usuario: ' + datos.usuario);

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

      // fecha actual.
      var Moment = require('moment-timezone');
      var date = Moment().tz('America/Bogota').format("YYYY-MM-DD");
      console.log('fecha actual de registrar ingreso : ' + date);

      var datos = {
        valor : req.body.txtValor,
        fecha_modificacion : date,
        tipo_gasto : req.body.comboCategoria,
        usuario : userName
      };

      console.log('valor: ' + datos.valor + ' tipo_gasto: ' + datos.tipo_gasto + ' fecha modificacion: ' +  date);

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

  },

/**
eiminarIngreso: function(req, res, next) {
    var id = req.body.id;
    console.log('id controller: ' + id);

    var consulta = 'delete from ingresos where ingresos_id = ?';

    var resultado = {resultado:null};

    db.query(consulta,id, function(err) {
       if (!err) {
         console.log('exito en la consulta');
         resultado.resultado = 'success';
       } else {
         console.log('hay un error ');
         resultado.resultado = 'error';
         throw err;
       }

       res.send(resultado);
    })
},
*/

  eliminar : function(req, res, next) {
      /*
      DELETE FROM gastos
      WHERE gastos_id = 1
      */

      var  id = req.body.id;
      console.log('id gastoController ' + id);

      var consulta = 'DELETE FROM gastos WHERE gastos_id = ?';

      var resultado = {resultado:null};

      db.query(consulta, id, function(error) {
        if (!error) {
          console.log('exito en el query');
          resultado.resultado = 'success';
        } else {
          console.error('error en el query');
          resultado.resultado = 'error';
          throw error;
        }

        console.log('resultado: ' + resultado.resultado);
        res.send(resultado);
      })
  }

};
