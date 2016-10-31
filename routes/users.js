var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('home/index',{title:'Home'});
});

router.get('/ingresos', function(req, res, next) {
  res.render('ingresos/index',{title:'Ingresos'});
});

module.exports = router;
