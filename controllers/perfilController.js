var mysql = require('mysql');
var config = require('../config/database');
var db = mysql.createConnection(config);

module.exports = {

  index: function(req, res, next) {

      var userName = req.session.userName;

      if (userName !== undefined) {

        /*
        SELECT usuarios.email, perfil.nombre,
        perfil.apellido, perfil.edad,
        perfil.telefono, perfil.fecha_nacimiento
        FROM usuarios, perfil
        WHERE usuarios.email = perfil.usuario
        AND usuarios.email = 'hans3102@hotmail.com'
        */

        var consulta = '';
        consulta += 'SELECT perfil.perfil_id, usuarios.email, perfil.nombre, ';
        consulta += 'perfil.apellido, perfil.edad, ';
        consulta += 'perfil.telefono, perfil.fecha_nacimiento ';
        consulta += 'FROM usuarios, perfil ';
        consulta += 'WHERE usuarios.email = perfil.usuario ';
        consulta += 'AND usuarios.email = ? ';

        var resultado = null;

        db.query(consulta, userName, function(error, rows, filds) {
            if (!error) {
              console.log('exito en el query');
              console.log('filas en la consulta del perfil : ' + rows.length);

              if (rows.length == 1) {
                console.log('coincide..');
                resultado = rows;
                res.render('perfil/index',{title:'Perfil', resultado: resultado})
              } else {
                console.log('no exites.');
              }

            } else {
              console.error('error en la consulta, ' + consulta);
              throw error;
            }
        })

      } else {
        res.send('vuelva a logearse');
      }

  },

  mostrarFormularioEditar: function(req,res, next) {

    var userName = req.session.userName;

    if (userName !== undefined) {
      var id = req.params.id;
      console.log('id: ' + id);

      var consulta = '';
      consulta += 'SELECT perfil.perfil_id, usuarios.email, perfil.nombre, ';
      consulta += 'perfil.apellido, perfil.edad, ';
      consulta += 'perfil.telefono, perfil.fecha_nacimiento ';
      consulta += 'FROM usuarios, perfil ';
      consulta += 'WHERE usuarios.email = perfil.usuario ';
      consulta += 'AND perfil.perfil_id = ? ';

      db.query(consulta,id,function(error, rows, fields) {
        if (!error) {

          console.log('filas: ' + rows.length);

          if (rows.length == 1) {

            var resultado = rows;

            res.render('perfil/editar',{title:'Editar Ingreso', resultado:resultado});

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

  actualizar : function(req, res, next) {

    var nombre = req.body.txtNombre;
    var apellido = req.body.txtApellido;
    var edad = req.body.txtEdad;
    var telefono = req.body.txtTelefono;
    var fecha_nacimiento = req.body.txtFechaNacimiento;
    var id = req.body.id;

    var resultado = {resultado:null}

    var datos = {
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      telefono : telefono,
      fecha_nacimiento: fecha_nacimiento
    }

    var consulta = 'update perfil set ? where perfil_id = ? ';

    db.query(consulta, [datos,id], function(error, result) {
      if (!error) {
        console.log('exito en la consulta..');
        resultado.resultado = 'success';
      } else {
        console.error('error en la consulta: ' + consulta);
        resultado.resultado = 'error';
        throw error;
      }

      res.send(resultado);
    })

  },

  formularioCambiarClave : function(req, res, next) {
    var userName = req.session.userName;
    if (userName !== undefined) {
      res.render('perfil/cambiarClave');
    } else {
      res.send('vuelva a logearse');
    }
  },

  cambiarClave: function(req, res, next) {
    var userName = req.session.userName;
    if (userName !== undefined) {

      function encriptar(email, pass) {
          var crypto = require('crypto');
          var hmac = crypto.createHmac('sha1', email).update(pass).digest('hex');
          return hmac
      }

      var contrasena = req.body.txtContrasena;
      var contrasenaNueva = req.body.txtContrasenaNueva;
      var confirmarContrasena = req.body.txtConfirmarContrasena;

      var resultado = {resultado:null, mensaje:null};

      var consulta = 'select email, contrasena from usuarios where email = ? and contrasena = ?  ';
      var actualizar = 'update usuarios set contrasena = ? where email = ? ';

      console.log('contrasena: ' + contrasena);
      console.log('contrasena nueva: ' + contrasenaNueva);
      console.log('confirmar contrasena: ' + confirmarContrasena);

      // confirmar las contrasenas..
      var contrasenaValida = false;
      if (contrasenaNueva === confirmarContrasena) {
        console.log('las contrasenas son iguales.');
        contrasenaValida = true;
      }else{
        console.log('las contrasenas no son iguales.');
        contrasenaValida = false;
        resultado.resultado = 'error';
        resultado.mensaje = 'las contraseñas no coinciden.';
      }

      if (contrasenaValida) {

        contrasena = encriptar(userName, contrasena);
        console.log('contrasena encriptada: ' + contrasena);

        // valido si la contrasena existe.
        db.query(consulta,[userName, contrasena], function(error, rows, filds) {
          if (!error) {
            console.log('exito en el query ' + consulta);
            console.log('hay ' + rows.length + ' que coinciden.. en cambiar clave.');
            if (rows.length) {
              console.log('la contrasena es correcta..');

              contrasenaNueva = encriptar(userName, contrasenaNueva);
              console.log('contrasenaNueva: ' + contrasenaNueva);

              db.query(actualizar,[contrasenaNueva, userName], function(error, result) {
                if (!error) {
                  resultado.resultado = 'success';
                  resultado.mensaje = 'se ha cambiado la contraseña de manera exitosa.';
                } else {
                  resultado.resultado = 'error';
                  resultado.mensaje = 'hay un error, informar al adminsitrador del sistema.';
                }

                res.send(resultado);
              })

            } else {
              console.log('la contrasena es incorrecta');
              resultado.resultado = 'error';
              resultado.mensaje = 'la contraseña es incorrecta.';
              res.send(resultado);
            }

          } else {
            resultado.resultado = 'error';
            resultado.mensaje = 'validar con el administrador del sistema';
            console.error('error en la consulta ' + consulta);
            throw error;
            res.send(resultado);
          }

        })

      }else{
          res.send(resultado);
      }// end contrasena valida.

    } else {
      res.send('vuelva a logearse');
    }
  },


  mostrarFotoPerfil : function(req, res, next) {
    res.render('perfil/foto',{title:'foto'})
  }

};
