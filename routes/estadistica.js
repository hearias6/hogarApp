var express = require('express');
var router = express.Router();

var controller = require('.././controllers');
var estadistica = controller.estadisticaController;

router.get('/',estadistica.index);
router.post('/sumaIngresos', estadistica.sumaIngresos);
router.post('/sumaGastos', estadistica.sumaGastos);

module.exports = router;
