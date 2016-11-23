
var mysql = require('mysql');
var config = require('../config/database');
var db = mysql.createConnection(config);

module.exports = {

  index: function(req, res, next) {

    var userName = req.session.userName;

    if (userName !== undefined) {
      res.render('estadistica/index',{title:'Estadistica', userName : userName});
    } else {
      res.send('loguearse');
    }

  },

  sumaGastos : function(req, res, next) {

    var userName = req.session.userName;

    if (userName !== undefined) {

      var consulta = 'select sum(valor) suma ';
      consulta+= 'from gastos, usuarios ';
      consulta+= 'where usuarios.email = ?';

      var email = req.body.userName;

      var resultado = null;

      db.query(consulta, userName, function(error, rows, filds) {

        if (!error) {
          console.log('exito en el query suma gastos.' );
          resultado = rows;
          console.log('resultado suma: ' + resultado[0].suma);
          res.send(resultado);

        } else {
          console.error('error en suma gastos '+ consulta);
          throw error;
        }

      })
    }else{
      res.send('no logeado');
    }


  },

  sumaIngresos : function(req, res, next) {

    var userName = req.session.userName;

    if (userName !== undefined) {

      var consulta = 'select sum(valor) suma ';
      consulta+= 'from ingresos, usuarios ';
      consulta+= 'where usuarios.email = ?';

      var resultado = null;

      db.query(consulta, userName, function(error, rows, filds) {

        if (!error) {
          console.log('exito en el query suma ingresos.' );
          resultado = rows;
          console.log('resultado suma: ' + resultado[0].suma);
          res.send(resultado);
        } else {
          console.error('error en suma ingresos '+ consulta);
          throw error;
        }

      })
    }else{
      res.send('no logeado');
    }
  }


};
