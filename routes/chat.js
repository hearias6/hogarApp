var express = require('express');
var router = express.Router();

var controller = require('.././controllers');

router.get('/', controller.chatController.index);

module.exports = router;
