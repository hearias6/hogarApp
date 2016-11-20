var express = require('express');
var router = express.Router();

var controller = require('.././controllers');

router.get('/', controller.perfilController.index);
router.get('/editar/:id', controller.perfilController.mostrarFormularioEditar);
router.put('/actualizar', controller.perfilController.actualizar);
router.get('/clave', controller.perfilController.formularioCambiarClave);
router.put('/cambiarClave', controller.perfilController.cambiarClave);


module.exports = router;
