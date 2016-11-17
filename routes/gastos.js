var express = require('express');
var router = express.Router();

var controller = require('.././controllers');

router.get('/', controller.gastoController.index);
router.get('/nuevo', controller.gastoController.mostrarFormularioNuevo);
module.exports = router;
