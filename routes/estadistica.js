var express = require('express');
var router = express.Router();

var controller = require('.././controllers');
var estadistica = controller.estadisticaController;

router.get('/',estadistica.index);

module.exports = router;
