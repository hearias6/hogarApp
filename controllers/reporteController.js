var jsreport = require('jsreport');
var fs = require('fs');
var async = require('async');

var mysql = require('mysql');
var config = require('../config/database');
var db = mysql.createConnection(config);
var app = {

  reporteIngresos: function(req, res, next) {
    var userName = req.session.userName;
    if (userName !== undefined) {
      var consulta = 'SELECT ingresos.ingresos_id, tipo_ingreso.descripcion, ingresos.valor, ingresos.fecha_creacion ';
      consulta += 'FROM ingresos, tipo_ingreso ';
      consulta += 'WHERE ingresos.tipo_ingreso = tipo_ingreso.tip_ingreso_id AND ingresos.usuario = ?';
      db.query(consulta, userName, function(error, rows, filds) {
        if (!error) {
          var filas = rows.length, lines =[];
          async.eachSeries(rows, function(value, callback) {
            var description = value.descripcion, valor = value.valor, create = value.fecha_creacion;

            var temp = '';
            temp += '<tr style="color:#aaa">';
            temp += '<td>'+description+'</td>';
            temp += '<td>'+valor+'</td>';
            temp += '<td>'+create+'</td>';
            temp += '</tr>';

            lines.push(temp);
            callback();
          }, function(err) {
            if (err) { throw err; }
            try {
              var tBody = lines.join("");
              var html = '';
              html += '<table style="width:90%; margin:auto; border:1px; font-family:arial; font-size:1.2em; text-align:center">';
              html += '<thead style="background-color:#ddd">';
              html += '<tr style="color:#777; font-weight:bold">';
              html += '<th>Categoria</th><th>Valor</th><th>Fecha Publicacion</th>';
              html += '</tr></thead>';
              html += '<tbody>'+tBody+'</tbody>';
              html += '</table>';

              jsreport.render({
                template: {
                  content: html,
                  engine: 'jsrender',
                  recipe: 'phantom-pdf',
                  phantom: {
                    orientation: 'portrait'
                  }
                }
              }).then(function(resp) {
                resp.result.pipe(fs.createWriteStream('./public/pdf/Reporte_Ingresos.pdf'));
                //res.redirect('/app/ingresos');
                var mjs = 'se ha creado el documento de pdf, favor buscarlo en la siguiente ruta. public/pdf';
                var respuesta = {respuesta:'success', mensaje:mjs};
                res.send(respuesta);

                console.log('creado')
              }).catch(function(e) {
                console.log('error', e);
              });
            }
            catch(ex) {
              console.log('error creating pdf ' + ex);
            }
          });
        }
        else {
          console.log('error... en la consulta: ' + consulta + ' por favor verificar');
          throw error;
          res.send('hay un error');
        }
      });
    }
    else {
      res.send('error 404');
    }
  },// end ingresos.


  reporteGastos: function(req, res, next) {
    var userName = req.session.userName;
    if (userName !== undefined) {
      var consulta = "SELECT g.gastos_id, tg.tipo_gasto_id, tg.descripcion, g.valor, g.fecha_creacion, g.usuario FROM gastos as g, tipo_gasto as tg where g.tipo_gasto = tg.tipo_gasto_id and g.usuario = ? ";
      db.query(consulta, userName, function(error, rows, filds) {
        if (!error) {
          var filas = rows.length, lines =[];
          async.eachSeries(rows, function(value, callback) {
            var description = value.descripcion, valor = value.valor, create = value.fecha_creacion;

            var temp = '';
            temp += '<tr style="color:#aaa">';
            temp += '<td>'+description+'</td>';
            temp += '<td>'+valor+'</td>';
            temp += '<td>'+create+'</td>';
            temp += '</tr>';

            lines.push(temp);
            callback();
          }, function(err) {
            if (err) { throw err; }
            try {
              var tBody = lines.join("");
              var html = '';
              html += '<table style="width:90%; margin:auto; border:1px; font-family:arial; font-size:1.2em; text-align:center">';
              html += '<thead style="background-color:#ddd">';
              html += '<tr style="color:#777; font-weight:bold">';
              html += '<th>Categoria</th><th>Valor</th><th>Fecha Publicacion</th>';
              html += '</tr></thead>';
              html += '<tbody>'+tBody+'</tbody>';
              html += '</table>';

              jsreport.render({
                template: {
                  content: html,
                  engine: 'jsrender',
                  recipe: 'phantom-pdf',
                  phantom: {
                    orientation: 'portrait'
                  }
                }
              }).then(function(resp) {
                resp.result.pipe(fs.createWriteStream('./public/pdf/Reporte_Gastos.pdf'));
                //res.redirect('/app/ingresos');
                var mjs = 'se ha creado el documento de pdf, favor buscarlo en la siguiente ruta. public/pdf';
                var respuesta = {respuesta:'success', mensaje:mjs};
                res.send(respuesta);

                console.log('creado')
              }).catch(function(e) {
                console.log('error', e);
              });
            }
            catch(ex) {
              console.log('error creating pdf ' + ex);
            }
          });
        }
        else {
          console.log('error... en la consulta: ' + consulta + ' por favor verificar');
          throw error;
          res.send('hay un error');
        }
      });
    }
    else {
      res.send('error 404');
    }
  } // end reporte gastos.


}

module.exports = app;
