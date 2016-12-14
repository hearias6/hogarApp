var express = require('express');
var router = express.Router();

var controller = require('.././controllers');

router.get('/', controller.chatController.index);
router.post('/guardarMensaje',  controller.chatController.guardarMensaje);

module.exports = router;
