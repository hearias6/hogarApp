var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({dest:'uploads/'}).single('foto');

var controller = require('.././controllers');

router.get('/', controller.perfilController.index);
router.get('/editar/:id', controller.perfilController.mostrarFormularioEditar);
router.put('/actualizar', controller.perfilController.actualizar);
router.get('/clave', controller.perfilController.formularioCambiarClave);
router.put('/cambiarClave', controller.perfilController.cambiarClave);
router.get('/foto',controller.perfilController.mostrarFotoPerfil);
router.post('/foto', upload, controller.perfilController.cambiarFotoPerfil);

module.exports = router;
