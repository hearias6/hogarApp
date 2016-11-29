var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({dest:'uploads/'}).single('foto');
var fs = require('fs');

var controller = require('.././controllers');

router.get('/', controller.perfilController.index);
router.get('/editar/:id', controller.perfilController.mostrarFormularioEditar);
router.put('/actualizar', controller.perfilController.actualizar);
router.get('/clave', controller.perfilController.formularioCambiarClave);
router.put('/cambiarClave', controller.perfilController.cambiarClave);
router.get('/foto',controller.perfilController.mostrarFotoPerfil);
router.post('/foto', upload, function(req, res, next) {
  var rutaTemp = './uploads/'+req.file.filename;
  var rutaActual = './public/img/perfil/'+req.file.originalname;

  console.log('ruta temporal: ' + rutaTemp);
  console.log('ruta actual: ' + rutaActual);

  //copiamos el archivo a la carpeta definitiva de fotos
  fs.createReadStream(rutaTemp).pipe(fs.createWriteStream(rutaActual));
  //borramos el archivo temporal creado
  fs.unlink(rutaTemp);

  res.send('upload');
});

module.exports = router;
