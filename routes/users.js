var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('home/index',{title:'Home'});
});

router.get('/ingresos', function(req, res, next) {
  res.render('ingresos/index',{title:'Ingresos'});
});

router.get('/nuevo', function(req, res, next) {
  res.render('ingresos/registrar',{title:'Registrar'});
});

router.get('/editar', function(req, res, next) {
  res.render('ingresos/editar',{title:'Editar'});
});

module.exports = router;
