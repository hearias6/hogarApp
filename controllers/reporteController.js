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
    var lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'

    PDFDocument = require('pdfkit');
    doc = new PDFDocument;

    doc.pipe(fs.createWriteStream('output.pdf'));

    doc.text(texto, 100, 300)
     .font('Times-Roman', 13)
     .moveDown()
     .text(lorem, {
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

   reporte: function(req, res, next) {

   }



}

module.exports = app;
