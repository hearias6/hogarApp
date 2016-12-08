var express = require('express');
var router = express.Router();

var controller = require('.././controllers');
//var rep = controller.reporteController;
//router.get('/', rep.index);

router.get('/reportes', controller.reporteController.reporteIngresos);

module.exports = router;
