var express = require('express');
var router = express.Router();

var controller = require('.././controllers');

router.get('/', controller.gastoController.index);
router.get('/nuevo', controller.gastoController.mostrarFormularioNuevo);
router.get('/editar/:id', controller.gastoController.mostrarFormularioEditar);
router.post('/guardar', controller.gastoController.registrar);
router.put('/actualizar',controller.gastoController.actualizar);
router.delete('/eliminar',controller.gastoController.eliminar);

module.exports = router;
