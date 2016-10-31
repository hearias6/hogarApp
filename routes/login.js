var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login/login', { title: 'Login' });
});

router.get('/singup',function(req, res, next) {
   res.render('login/singup', {title: 'Singup'})
})

router.get('/grid',function(req, res, next) {
   res.render('login/grid', {title: 'Grid'})
})
module.exports = router;
