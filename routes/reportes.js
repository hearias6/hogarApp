var express = require('express');
var router = express.Router();

var controller = require('.././controllers');
//var rep = controller.reporteController;
//router.get('/', rep.index);

router.get('/reportesIngresos', controller.reporteController.reporteIngresos);
router.get('/reportesGastos', controller.reporteController.reporteGastos);

module.exports = router;
