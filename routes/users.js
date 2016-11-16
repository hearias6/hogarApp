var express = require('express');
var router = express.Router();

var controller = require('.././controllers');

router.get('/', controller.userController.index);
router.get('/ingresos', controller.userController.ingresos);
router.get('/editar/:id', controller.userController.mostrarFormularioEditar);
router.get('/nuevo', controller.userController.mostrarFormularioNuevo);

router.put('/editar', controller.userController.modificarIngreso);
router.delete('/eliminar', controller.userController.eiminarIngreso);
router.post('/guardar',controller.userController.registrarIngreso);

module.exports = router;
