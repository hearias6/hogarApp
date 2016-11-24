var express = require('express');
var router = express.Router();

var controller = require('.././controllers');

router.get('/', controller.ingresoController.index);
router.get('/ingresos', controller.ingresoController.ingresos);
router.get('/editar/:id', controller.ingresoController.mostrarFormularioEditar);
router.get('/nuevo', controller.ingresoController.mostrarFormularioNuevo);

router.put('/editar', controller.ingresoController.modificarIngreso);
router.delete('/eliminar', controller.ingresoController.eiminarIngreso);
router.post('/guardar',controller.ingresoController.registrarIngreso);

module.exports = router;
