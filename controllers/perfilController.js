var mysql = require('mysql');
var config = require('../config/database');
var db = mysql.createConnection(config);

var fs = require('fs');

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
        consulta += 'perfil.telefono, perfil.fecha_nacimiento, perfil.foto_perfil ';
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
    var email = req.session.userName;
    var consulta = 'select foto_perfil from perfil where usuario = ?';
    var resultado = {resultado:'', mensaje:''}

    db.query(consulta, email, function(error, rows, fields) {
      if (!error) {
        resultado.resultado = 'success';
      } else {
        throw error;
      }

      if (resultado.resultado == 'success') {

        if (rows.length == 1) {
          var foto = rows[0].foto_perfil;
          console.log('foto: ' + foto);
          res.render('perfil/foto',{title:'foto', foto:foto, email: email});
        } else {
          resultado.resultado = 'error';
          resultado.mensaje = 'error en mostrarFormularioEditar.';
          res.send(resultado);
        }

      }
    })

  },

  cambiarFotoPerfil : function(req, res, next) {

    try {

      var img = req.file.originalname;
      var email = req.body.email;
      var rutaTemp = './uploads/'+req.file.filename;
      var rutaActual = './public/img/' + email + '/perfil/'+req.file.originalname;
      var mirarFotoAnterior = 'select foto_perfil from perfil where usuario = ? ';
      var actualizarFotoPerfil = 'update perfil set foto_perfil = ? where usuario = ?';

      var resultado = {resultado:'', mensaje:''};

      db.query(mirarFotoAnterior, email, function(error, rows, filed) {

        if (!error) {
          resultado.resultado = 'success';
        } else {
          throw error;
          console.error('error en mirar Foto Anterior');
        }

        if (resultado.resultado == 'success') {

          // eliminar foto perfil anterior..
          if (rows[0].foto_perfil != '' && rows[0].foto_perfil.length > 0) {
            fs.unlink('./public/img/' + email + '/perfil/' + rows[0].foto_perfil);
          }else {
            console.log('no hay foto anterior.');
          }

          //copiamos el archivo a la carpeta definitiva de fotos
          fs.createReadStream(rutaTemp).pipe(fs.createWriteStream(rutaActual));

          //borramos el archivo temporal creado
          fs.unlink(rutaTemp);

          // actualizar foto perfill...
          db.query(actualizarFotoPerfil, [img, email], function(error, result) {
              if (!error) {
                resultado.resultado = 'success';
                resultado.mensaje = 'se ha cambiado la foto de perfil con exito';
                res.redirect('/app/perfil/foto');
              } else {
                console.log('erorr en actualizar foto perfil');
                resultado.resultado = 'error';
                resultado.mensaje = 'Hay un problema en actualizar la foto de perfil..';
                res.send(resultado);
                throw error;
              }
          });

        } else {
          console.log('hay un error....');
          res.send('Error en mirar Foto Anterior...')
        }

      });

    } catch (e) {
      console.log('error: ' + e);
      throw e;
      resultado.resultado = 'error';
      resultado.mensaje = 'Hay un error en el sistema';
      res.send(resultado);
    }

  }


};
