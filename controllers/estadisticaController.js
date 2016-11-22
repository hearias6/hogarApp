
var mysql = require('mysql');
var config = require('../config/database');
var db = mysql.createConnection(config);

module.exports = {

  index: function(req, res, next) {

    var userName = req.session.userName;

    /*
    select sum(valor)
    from ingresos, usuarios
    where usuarios.email = 'hans3102@hotmail.com'
    */

    /*
    function suma(numero_uno,numero_dos,callback){
       setTimeout(function(){
          var resultado = numero_uno + numero_dos;
          callback(resultado);
       }, 500);
    }

    suma(2,5,function(resultado){
       console.log(resultado);
    })
    */

    if (userName !== undefined) {


      function sumaIngresos(email, callback) {

         var consulta = 'select sum(valor) suma ';
         consulta+= 'from ingresos, usuarios ';
         consulta+= 'where usuarios.email = ?';

         var resultado = null;

         db.query(consulta, email, function(error, rows, filds) {

           if (!error) {
             console.log('exito en el query suma ingresos.' );
             resultado = rows;
             console.log('resultado suma: ' + resultado[0].suma);
             callback(resultado);
           } else {
             console.error('error en suma ingresos '+ consulta);
             throw error;
           }

         })
      }

      function sumaGastos(email, callback) {

         var consulta = 'select sum(valor) suma ';
         consulta+= 'from gastos, usuarios ';
         consulta+= 'where usuarios.email = ?';

         var resultado = null;

         db.query(consulta, email, function(error, rows, filds) {

           if (!error) {
             console.log('exito en el query suma gastos.' );
             resultado = rows;
             console.log('resultado suma: ' + resultado[0].suma);
             callback(resultado);
           } else {
             console.error('error en suma gastos '+ consulta);
             throw error;
           }

         })
      }

      var res1 = null;
      sumaGastos(userName, function(resultado) {
        res1 = resultado[0].suma;
      })

      console.log('res1 ' + res1);

      res.render('estadistica/index',{title:'Estadistica', userName : userName});

    } else {
      res.send('loguearse');
    }

  }


};
