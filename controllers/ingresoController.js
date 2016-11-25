
var mysql = require('mysql');
var config = require('../config/database');
var db = mysql.createConnection(config);


module.exports = {

  // get.
  index:function(req, res, next) {

    var userName = req.session.userName;

    //if (userName !== undefined) {
    if (true) {
      res.render('home/index', { title: 'Home', userName : userName});
    } else {
      res.send('error 404');
    }

  },

  ingresos:function(req, res, next) {
    var userName = req.session.userName;

    if (userName !== undefined) {

      var consulta = 'select ingresos.ingresos_id, tipo_ingreso.descripcion, ingresos.valor, ingresos.fecha_creacion ';
      consulta += 'from ingresos, tipo_ingreso ';
      consulta += 'where ingresos.tipo_ingreso = tipo_ingreso.tip_ingreso_id and ingresos.usuario = ?';

      db.query(consulta, userName, function(error, rows, filds) {
        if (!error) {
           var filas = rows.length;
           var resultado = rows;

           console.log('hay ' + filas + ' numeros de registros');
           res.render('ingresos/index', { title: 'Ingresos', userName : userName, resultado:resultado});
        }else{
           console.log('error... en la consulta: ' + consulta + ' por favor verificar');
           throw error;
           res.send('hay un error');
        }
      })

    } else {
      res.send('error 404');
    }
  },


  mostrarFormularioEditar:function (req, res, next) {

    var userName = req.session.userName;

    if (userName !== undefined) {
      var id = req.params.id;
      console.log('id: ' + id);

      var consulta = 'select ingresos.ingresos_id, tipo_ingreso.tip_ingreso_id, tipo_ingreso.descripcion, ingresos.valor, ingresos.fecha_creacion ';
      consulta += 'from ingresos, tipo_ingreso ';
      consulta += 'where ingresos.tipo_ingreso = tipo_ingreso.tip_ingreso_id and ingresos.ingresos_id = ?';

      db.query(consulta,id,function(error, rows, fields) {
        if (!error) {

          console.log('filas: ' + rows.length);

          if (rows.length == 1) {

            var resultado = rows;

            res.render('ingresos/editar',{title:'Editar Ingreso', resultado:resultado});

            //res.send('existe el id: ' + id);
          } else {
            res.send('no existe el id: ' + id);
          }
        } else {
          console.log('hay un error en la siguiente consulta: ');
          console.log(consulta);
        }
      });

    }
    else{
      res.send('usuario no logeado');
    }

  },


  modificarIngreso: function(req, res, next) {

    var id = req.body.id;
    var categoria = req.body.comboCategoria;
    var valor = req.body.txtValor;
    var fecha = req.body.dateFechaCreacion;

    // fecha actual.
    var Moment = require('moment-timezone');
    var date = Moment().tz('America/Bogota').format("YYYY-MM-DD");
    console.log('fecha actual de modificar ingreso : ' + date);

    var resultado = {resultado:null};

    console.log('categoria: ' + categoria + ' valor: ' + valor + ' fecha: ' + fecha + ' date: ' + date);

    var datos = {
                  valor:valor,
                  fecha_modificacion: date,
                  tipo_ingreso: categoria
                };

    var consulta = 'update ingresos set ? where ingresos_id = ?';

    db.query(consulta, [datos, id], function(error, rows, fields) {

      if (!error) {
         resultado.resultado = 'success'
         console.log('resultado: ' + resultado.resultado);
         res.send(resultado);
      } else {
         console.log('error en la consulta ' + consulta);
         throw error;
         resultado.resultado = 'error';
         res.send(resultado);
      }

    });

  },

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

  mostrarFormularioNuevo: function(req, res, next) {
     var userName = req.session.userName;

     if (userName !== undefined) {

       var consulta = 'SELECT tip_ingreso_id, descripcion FROM tipo_ingreso';

       db.query(consulta, function(error, rows, filds) {
         if (!error) {
           console.log('exito en la consulta lista de tipo_ingreso.');
           if (rows.length > 0) {
             var filas = rows;
             res.render('ingresos/nuevo',{title:'Nuevo Ingreso', filas: filas});
           }
         } else {
           console.error('error en la consulta: ' + consulta);
           throw error;
         }
       })

     } else {
       res.send('no logeado');
     }
  },

  registrarIngreso: function(req, res, next) {

    var categoria = req.body.comboCategoria;
    var valor = req.body.txtValor;
    var fecha = req.body.dateFechaCreacion;
    var userName = req.session.userName;

    // fecha actual.
    var Moment = require('moment-timezone');
    var date = Moment().tz('America/Bogota').format("YYYY-MM-DD");
    console.log('fecha actual de registrar ingreso : ' + date);


    var resultado = {resultado:null};

    console.log('categoria: ' + categoria + ' valor: ' + valor + ' fecha: ' + fecha + 'date ' + date);

    var datos = {
                  valor:valor,
                  fecha_creacion: date,
                  fecha_modificacion: date,
                  tipo_ingreso: categoria,
                  usuario: userName
                };

    var consulta = 'insert into ingresos set ? ';

    db.query(consulta, datos, function(err, result) {
      if (!err) {
        console.log('exito en la consulta');
        console.log('result: ' + result.length);
        resultado.resultado = 'success';
      } else {
        console.log('error en la consulta ');
        resultado.resultado = 'error';
        throw err;
      }

      res.send(resultado);
    })

  }

}; // export
