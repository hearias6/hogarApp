var express = require('express');
var router = express.Router();

var controller = require('.././controllers');

router.get('/', controller.userController.index);
router.get('/ingresos', controller.userController.ingresos);
router.get('/editar/:id', controller.userController.mostrarFormularioEditar);

router.post('/editar', controller.userController.modificarIngreso);

module.exports = router;
