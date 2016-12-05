var express = require('express');
var router = express.Router();

var controller = require('.././controllers');
var rep = controller.reporteController;

router.get('/', rep.index);

module.exports = router;
