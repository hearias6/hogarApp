var jsreport = require('jsreport');
var fs = require('fs');
var async = require('async');

var mysql = require('mysql');
var config = require('../config/database');
var db = mysql.createConnection(config);
var app = {

  /*
  @link http://pdfkit.org/
  @description generar reporte.
  */

  /*
  @link http://www.codeblocq.com/2016/05/PDF-Generation-with-Node-JS/
  @description generar reporte.
  */

  /*
  @link https://www.npmjs.com/package/streamline-pdfkit
  @description generar reporte.
  */

  // pdfkit.
  index: function(req, res, next) {
    var PDFDocument, doc;
    var fs = require('fs');
    var texto = 'Texto de prueba..';
    var lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';
    PDFDocument = require('pdfkit');
    doc = new PDFDocument;
    doc.pipe(fs.createWriteStream('output.pdf'));
    doc.text(texto, 100, 300).font('Times-Roman', 13).moveDown().text(lorem, {
      width: 412,
      align: 'justify',
      indent: 30,
      columns: 2,
      height: 300,
      ellipsis: true
    });
    doc.end();
    res.send('reporte');
  },

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
                resp.result.pipe(fs.createWriteStream('./public/pdf/mipdf.pdf'));
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
  }
}

module.exports = app;
